import { FruitPicker } from "src/components/game/FruitPicker";
import { SudokuGrid } from "src/components/sudoku/SudokuGrid";
import type { Difficulty, Grid } from "src/lib/types";
import { GameInfoBar } from "./GameInfoBar";

interface GameScreenProps {
  grid: Grid;
  selectedCell: { row: number; col: number } | null;
  difficulty: Difficulty;
  gameStatus: "playing" | "won";
  showConflicts: boolean;
  elapsedTime: number;
  conflictingCells: Set<string>;
  currentFruits: string[];
  mounted: boolean;
  theme: string;
  onThemeToggle: () => void;
  onNewGame: () => void;
  onToggleConflicts: () => void;
  onHome: () => void;
  onCellClick: (row: number, col: number) => void;
  onFruitClick: (fruit: number | null) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}

export function GameScreen({
  grid,
  selectedCell,
  difficulty,
  gameStatus,
  showConflicts,
  elapsedTime,
  conflictingCells,
  currentFruits,
  mounted,
  theme,
  onThemeToggle,
  onNewGame,
  onToggleConflicts,
  onHome,
  onCellClick,
  onFruitClick,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
}: GameScreenProps) {
  return (
    <>
      <GameInfoBar
        difficulty={difficulty}
        elapsedTime={elapsedTime}
        mounted={mounted}
        theme={theme}
        onThemeToggle={onThemeToggle}
        onNewGame={onNewGame}
        onToggleConflicts={onToggleConflicts}
        onHome={onHome}
        showConflicts={showConflicts}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={onUndo}
        onRedo={onRedo}
      />

      <SudokuGrid
        grid={grid}
        selectedCell={selectedCell}
        onCellClick={onCellClick}
        gameOver={gameStatus === "won"}
        conflictingCells={conflictingCells}
        fruits={currentFruits}
      />

      <FruitPicker
        onFruitClick={onFruitClick}
        disabled={!selectedCell || gameStatus === "won"}
        fruits={currentFruits}
      />
    </>
  );
}
