import type { Grid } from "src/lib/types";
import { Board } from "./Board";

interface SudokuGridProps {
  grid: Grid;
  selectedCell: { row: number; col: number } | null;
  onCellClick: (row: number, col: number) => void;
  gameOver: boolean;
  conflictingCells: Set<string>;
  fruits: string[];
}

export function SudokuGrid({
  grid,
  selectedCell,
  onCellClick,
  gameOver,
  conflictingCells,
  fruits,
}: SudokuGridProps) {
  // Organize grid into 3x3 boxes
  const boxes: Grid[][] = [];

  for (let boxRow = 0; boxRow < 3; boxRow++) {
    boxes[boxRow] = [];
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const box: Grid = [];
      for (let r = 0; r < 3; r++) {
        const row: (typeof grid)[0] = [];
        for (let c = 0; c < 3; c++) {
          const rowIdx = boxRow * 3 + r;
          const colIdx = boxCol * 3 + c;
          row.push(grid[rowIdx][colIdx]);
        }
        box.push(row);
      }
      boxes[boxRow][boxCol] = box;
    }
  }

  return (
    <Board
      cells={boxes}
      selectedCell={selectedCell}
      onCellClick={onCellClick}
      gameOver={gameOver}
      conflictingCells={conflictingCells}
      fruits={fruits}
    />
  );
}
