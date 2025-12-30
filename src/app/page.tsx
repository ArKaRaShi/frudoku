"use client";

import { useCallback, useEffect, useState } from "react";
import { FruitPicker } from "src/components/FruitPicker";
import { GameControls } from "src/components/GameControls";
import { SudokuGrid } from "src/components/SudokuGrid";
import type { Fruit } from "src/lib/fruits";
import { generatePuzzle, isSolved } from "src/lib/sudoku";
import type { Difficulty, GameState } from "src/lib/types";

export default function Home() {
  const [gameState, setGameState] = useState<GameState>(() => ({
    grid: generatePuzzle("medium"),
    selectedCell: null,
    difficulty: "medium",
    startTime: Date.now(),
    gameStatus: "playing",
  }));

  const [elapsedTime, setElapsedTime] = useState(0);

  // Timer effect
  useEffect(() => {
    if (gameState.gameStatus === "playing" && gameState.startTime) {
      const startTime = gameState.startTime;
      const interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameState.startTime, gameState.gameStatus]);

  // Start new game
  const newGame = useCallback((difficulty: Difficulty) => {
    setGameState({
      grid: generatePuzzle(difficulty),
      selectedCell: null,
      difficulty,
      startTime: Date.now(),
      gameStatus: "playing",
    });
    setElapsedTime(0);
  }, []);

  // Handle cell click
  const handleCellClick = useCallback((row: number, col: number) => {
    setGameState((prev) => {
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
      if (!prev.selectedCell || prev.gameStatus === "won") {
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

      return {
        ...prev,
        grid: newGrid,
        gameStatus: newStatus,
      };
    });
  }, []);

  const { grid, selectedCell, difficulty, gameStatus } = gameState;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col items-center gap-8 py-16 px-4">
        <h1 className="text-4xl font-bold tracking-tight text-black dark:text-zinc-50">
          Fruit Sudoku
        </h1>

        <GameControls
          difficulty={difficulty}
          onDifficultyChange={newGame}
          onNewGame={() => newGame(difficulty)}
          elapsedTime={elapsedTime}
        />

        {/* Win Message */}
        {gameStatus === "won" && (
          <div className="px-6 py-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full font-semibold animate-bounce">
            You solved it! 🎉
          </div>
        )}

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
