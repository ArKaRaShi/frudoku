"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { loadFromStorage, STORAGE_KEYS, saveToStorage } from "src/lib/storage";
import { generatePuzzle, getConflictingCells, isSolved } from "src/lib/sudoku";
import { getFruitsForTheme } from "src/lib/themes";
import type { Difficulty, GameState, Screen, Theme } from "src/lib/types";

export function useGameState() {
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
      showConflicts: true,
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
        showConflicts: true,
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

  return {
    // State
    screen,
    selectedDifficulty,
    setSelectedDifficulty,
    fruitTheme,
    setFruitTheme,
    customFruits,
    setCustomFruits,
    settingsModalOpen,
    setSettingsModalOpen,
    gameState,
    elapsedTime,
    currentFruits,
    conflictingCells,

    // Callbacks
    startGame,
    newGame,
    goToLanding,
    toggleConflicts,
    handleCellClick,
    handleFruitClick,
  };
}
