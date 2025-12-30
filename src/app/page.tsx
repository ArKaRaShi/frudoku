"use client";

import {
  AlertCircle,
  Check,
  Home as HomeIcon,
  Menu,
  Moon,
  RotateCw,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FruitPicker } from "src/components/FruitPicker";
import { LandingPage } from "src/components/LandingPage";
import { SettingsModal } from "src/components/SettingsModal";
import { SudokuGrid } from "src/components/SudokuGrid";
import { generatePuzzle, isSolved } from "src/lib/sudoku";
import { getFruitsForTheme } from "src/lib/themes";
import type { Difficulty, GameState, Screen, Theme } from "src/lib/types";

// Local storage keys
const STORAGE_KEYS = {
  THEME: "fruit-sudoku-theme",
  CUSTOM_FRUITS: "fruit-sudoku-custom-fruits",
};

// Helper to check if a cell has conflicts with other cells
function getConflictingCells(grid: GameState["grid"]): Set<string> {
  const conflicts = new Set<string>();

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = grid[row][col];
      if (cell.value === null) continue;

      // Check row for duplicates
      for (let c = 0; c < 9; c++) {
        if (c !== col && grid[row][c].value === cell.value) {
          conflicts.add(`${row}-${col}`);
          conflicts.add(`${row}-${c}`);
        }
      }

      // Check column for duplicates
      for (let r = 0; r < 9; r++) {
        if (r !== row && grid[r][col].value === cell.value) {
          conflicts.add(`${row}-${col}`);
          conflicts.add(`${r}-${col}`);
        }
      }

      // Check 3x3 box for duplicates
      const boxRow = Math.floor(row / 3) * 3;
      const boxCol = Math.floor(col / 3) * 3;
      for (let r = boxRow; r < boxRow + 3; r++) {
        for (let c = boxCol; c < boxCol + 3; c++) {
          if ((r !== row || c !== col) && grid[r][c].value === cell.value) {
            conflicts.add(`${row}-${col}`);
            conflicts.add(`${r}-${c}`);
          }
        }
      }
    }
  }

  return conflicts;
}

// Load from local storage
function loadFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

// Save to local storage
function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors
  }
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty>("medium");

  // Fruit theme state
  const [fruitTheme, setFruitTheme] = useState<Theme>(() =>
    loadFromStorage<Theme>(STORAGE_KEYS.THEME, "default"),
  );
  const [customFruits, setCustomFruits] = useState<string[]>(() =>
    loadFromStorage<string[]>(STORAGE_KEYS.CUSTOM_FRUITS, [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ]),
  );
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  const [gameState, setGameState] = useState<GameState | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Appearance theme (light/dark)
  const { theme: appearanceTheme, setTheme: setAppearanceTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Get current fruits based on theme
  const currentFruits = useMemo(
    () => getFruitsForTheme(fruitTheme, customFruits),
    [fruitTheme, customFruits],
  );

  // Save theme to storage whenever it changes
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.THEME, fruitTheme);
  }, [fruitTheme]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CUSTOM_FRUITS, customFruits);
  }, [customFruits]);

  // Calculate conflicting cells when showConflicts is enabled
  const conflictingCells = useMemo(() => {
    if (!gameState?.showConflicts) return new Set<string>();
    return getConflictingCells(gameState.grid);
  }, [gameState?.grid, gameState?.showConflicts]);

  // Timer effect
  useEffect(() => {
    if (gameState?.gameStatus === "playing" && gameState.startTime) {
      const startTime = gameState.startTime;
      const interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameState?.startTime, gameState?.gameStatus]);

  // Start game from landing page
  const startGame = useCallback(() => {
    setGameState({
      grid: generatePuzzle(selectedDifficulty),
      selectedCell: null,
      difficulty: selectedDifficulty,
      startTime: Date.now(),
      gameStatus: "playing",
      showConflicts: false,
      theme: fruitTheme,
      customFruits,
    });
    setElapsedTime(0);
    setScreen("playing");
  }, [selectedDifficulty, fruitTheme, customFruits]);

  // Start new game (from GameControls or win screen)
  const newGame = useCallback(
    (difficulty: Difficulty) => {
      setGameState({
        grid: generatePuzzle(difficulty),
        selectedCell: null,
        difficulty,
        startTime: Date.now(),
        gameStatus: "playing",
        showConflicts: false,
        theme: fruitTheme,
        customFruits,
      });
      setElapsedTime(0);
      setScreen("playing");
    },
    [fruitTheme, customFruits],
  );

  // Return to landing page
  const goToLanding = useCallback(() => {
    setScreen("landing");
    setGameState(null);
    setElapsedTime(0);
  }, []);

  // Toggle conflicts display
  const toggleConflicts = useCallback(() => {
    setGameState((prev) => {
      if (!prev) return null;
      return { ...prev, showConflicts: !prev.showConflicts };
    });
  }, []);

  // Handle cell click
  const handleCellClick = useCallback((row: number, col: number) => {
    setGameState((prev) => {
      if (!prev) return null;
      const cell = prev.grid[row][col];
      // Can only select non-initial cells
      if (cell.initial) {
        return prev;
      }
      return {
        ...prev,
        selectedCell: { row, col },
      };
    });
  }, []);

  // Handle fruit selection
  const handleFruitClick = useCallback((fruit: number | null) => {
    setGameState((prev) => {
      if (!prev || !prev.selectedCell || prev.gameStatus === "won") {
        return prev;
      }

      const { row, col } = prev.selectedCell;
      const newGrid = prev.grid.map((r) =>
        r.map((cell) => {
          if (cell.row === row && cell.col === col) {
            return {
              ...cell,
              value:
                fruit === null
                  ? null
                  : (fruit as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8),
            };
          }
          return cell;
        }),
      );

      const newStatus = isSolved(newGrid)
        ? ("won" as const)
        : ("playing" as const);

      const newState: GameState = {
        ...prev,
        grid: newGrid,
        gameStatus: newStatus,
      };

      // Auto-transition to win screen
      if (newStatus === "won") {
        setScreen("won");
      }

      return newState;
    });
  }, []);

  // Landing screen
  if (screen === "landing") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex flex-col items-center gap-8 py-16 px-4 w-full max-w-md relative">
          {/* Theme toggle button */}
          {mounted && (
            <button
              type="button"
              onClick={() =>
                setAppearanceTheme(
                  appearanceTheme === "dark" ? "light" : "dark",
                )
              }
              className="absolute top-4 right-4 p-2 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
              aria-label={appearanceTheme === "dark" ? "โหมดสว่าง" : "โหมดมืด"}
            >
              {appearanceTheme === "dark" ? (
                <Sun size={20} />
              ) : (
                <Moon size={20} />
              )}
            </button>
          )}
          <LandingPage
            selectedDifficulty={selectedDifficulty}
            onDifficultyChange={setSelectedDifficulty}
            onStart={startGame}
            onSettings={() => setSettingsModalOpen(true)}
            currentFruits={currentFruits}
            mounted={mounted}
          />
          <SettingsModal
            isOpen={settingsModalOpen}
            onClose={() => setSettingsModalOpen(false)}
            currentTheme={fruitTheme}
            customFruits={customFruits}
            onThemeChange={setFruitTheme}
            onCustomFruitsChange={setCustomFruits}
          />
        </main>
      </div>
    );
  }

  // Win screen
  if (screen === "won" && gameState) {
    const { difficulty, grid } = gameState;
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex flex-col items-center gap-8 py-16 px-4 w-full max-w-lg relative">
          {/* Theme toggle button */}
          {mounted && (
            <button
              type="button"
              onClick={() =>
                setAppearanceTheme(
                  appearanceTheme === "dark" ? "light" : "dark",
                )
              }
              className="absolute top-4 right-4 p-2 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
              aria-label={appearanceTheme === "dark" ? "โหมดสว่าง" : "โหมดมืด"}
            >
              {appearanceTheme === "dark" ? (
                <Sun size={20} />
              ) : (
                <Moon size={20} />
              )}
            </button>
          )}
          <div className="px-8 py-6 bg-green-100 dark:bg-green-900 rounded-2xl text-center">
            <h2 className="text-4xl font-bold text-green-800 dark:text-green-200 mb-2">
              คุณชนะแล้ว! 🎉
            </h2>
            <p className="text-lg text-green-700 dark:text-green-300">
              เวลา: {formatTime(elapsedTime)}
            </p>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => newGame(difficulty)}
              className="px-8 py-3 text-lg font-semibold rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors"
            >
              เล่นอีกครั้ง
            </button>
            <button
              type="button"
              onClick={goToLanding}
              className="px-8 py-3 text-lg font-semibold rounded-full bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
            >
              หน้าหลัก
            </button>
          </div>

          <SudokuGrid
            grid={grid}
            selectedCell={null}
            onCellClick={() => {}}
            gameOver={true}
            conflictingCells={new Set()}
            fruits={currentFruits}
          />
        </main>
      </div>
    );
  }

  // Playing screen
  if (!gameState) return null;

  const { grid, selectedCell, difficulty, gameStatus, showConflicts } =
    gameState;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col items-center gap-6 py-16 px-4 w-full max-w-lg">
        {/* Info bar with hamburger menu */}
        <div className="flex items-center justify-between w-full text-sm relative">
          <span className="text-zinc-600 dark:text-zinc-400">
            ระดับความยาก:{" "}
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
              {getDifficultyLabel(difficulty)}
            </span>
          </span>
          <div className="flex items-center gap-3">
            <span className="text-zinc-600 dark:text-zinc-400">
              เวลา:{" "}
              <span className="font-mono font-semibold text-zinc-800 dark:text-zinc-200">
                {formatTime(elapsedTime)}
              </span>
            </span>
            {/* Theme toggle button */}
            {mounted && (
              <button
                type="button"
                onClick={() =>
                  setAppearanceTheme(
                    appearanceTheme === "dark" ? "light" : "dark",
                  )
                }
                className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
                aria-label={appearanceTheme === "dark" ? "โหมดสว่าง" : "โหมดมืด"}
              >
                {appearanceTheme === "dark" ? (
                  <Sun size={18} />
                ) : (
                  <Moon size={18} />
                )}
              </button>
            )}
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                aria-label="เมนู"
              >
                <Menu size={18} />
                <span>เมนู</span>
              </button>

              {/* Dropdown menu */}
              {menuOpen && (
                <div className="absolute right-0 top-12 mt-1 w-52 bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden z-50">
                  <button
                    type="button"
                    onClick={() => {
                      newGame(difficulty);
                      setMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-3"
                  >
                    <RotateCw size={16} />
                    <span>เกมใหม่</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      toggleConflicts();
                    }}
                    className={`w-full px-4 py-3 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-3 ${
                      showConflicts
                        ? "text-red-700 dark:text-red-300"
                        : "text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    {showConflicts ? (
                      <Check size={16} />
                    ) : (
                      <AlertCircle size={16} />
                    )}
                    <span>
                      {showConflicts ? "ซ่อนผลไม้ชนกัน" : "แสดงผลไม้ชนกัน"}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      goToLanding();
                      setMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-3"
                  >
                    <HomeIcon size={16} />
                    <span>หน้าหลัก</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <SudokuGrid
          grid={grid}
          selectedCell={selectedCell}
          onCellClick={handleCellClick}
          gameOver={gameStatus === "won"}
          conflictingCells={conflictingCells}
          fruits={currentFruits}
        />

        <FruitPicker
          onFruitClick={handleFruitClick}
          disabled={!selectedCell || gameStatus === "won"}
          fruits={currentFruits}
        />
      </main>
    </div>
  );
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: "ง่าย",
  medium: "ปานกลาง",
  hard: "ยาก",
};

function getDifficultyLabel(difficulty: Difficulty): string {
  return DIFFICULTY_LABELS[difficulty];
}
