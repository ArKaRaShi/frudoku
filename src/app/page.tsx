"use client";

import { useCallback, useEffect, useState } from "react";
import { FruitPicker } from "src/components/FruitPicker";
import { GameControls } from "src/components/GameControls";
import { LandingPage } from "src/components/LandingPage";
import { SudokuGrid } from "src/components/SudokuGrid";
import type { Fruit } from "src/lib/fruits";
import { generatePuzzle, isSolved } from "src/lib/sudoku";
import type { Difficulty, GameState, Screen } from "src/lib/types";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty>("medium");
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

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
    });
    setElapsedTime(0);
    setScreen("playing");
  }, [selectedDifficulty]);

  // Start new game (from GameControls or win screen)
  const newGame = useCallback((difficulty: Difficulty) => {
    setGameState({
      grid: generatePuzzle(difficulty),
      selectedCell: null,
      difficulty,
      startTime: Date.now(),
      gameStatus: "playing",
    });
    setElapsedTime(0);
    setScreen("playing");
  }, []);

  // Return to landing page
  const goToLanding = useCallback(() => {
    setScreen("landing");
    setGameState(null);
    setElapsedTime(0);
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
  const handleFruitClick = useCallback((fruit: Fruit) => {
    setGameState((prev) => {
      if (!prev || !prev.selectedCell || prev.gameStatus === "won") {
        return prev;
      }

      const { row, col } = prev.selectedCell;
      const newGrid = prev.grid.map((r) =>
        r.map((cell) => {
          if (cell.row === row && cell.col === col) {
            return { ...cell, value: fruit };
          }
          return cell;
        }),
      );

      const newStatus = isSolved(newGrid) ? "won" : "playing";

      const newState = {
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
        <main className="flex flex-col items-center gap-8 py-16 px-4">
          <LandingPage
            selectedDifficulty={selectedDifficulty}
            onDifficultyChange={setSelectedDifficulty}
            onStart={startGame}
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
        <main className="flex flex-col items-center gap-8 py-16 px-4">
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
          />
        </main>
      </div>
    );
  }

  // Playing screen
  if (!gameState) return null;

  const { grid, selectedCell, difficulty, gameStatus } = gameState;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col items-center gap-8 py-16 px-4">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black dark:text-zinc-50">
            ซูโดกุผลไม้
          </h1>
          <button
            type="button"
            onClick={goToLanding}
            className="px-3 py-1 text-sm rounded-full bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
          >
            เมนู
          </button>
        </div>

        <GameControls
          onNewGame={() => newGame(difficulty)}
          elapsedTime={elapsedTime}
        />

        <SudokuGrid
          grid={grid}
          selectedCell={selectedCell}
          onCellClick={handleCellClick}
          gameOver={gameStatus === "won"}
        />

        <FruitPicker
          onFruitClick={handleFruitClick}
          disabled={!selectedCell || gameStatus === "won"}
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
