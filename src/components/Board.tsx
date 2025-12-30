import type { Grid } from "src/lib/types";
import { Cell } from "./Cell";

interface BoardProps {
  cells: Grid[][];
  selectedCell: { row: number; col: number } | null;
  onCellClick: (row: number, col: number) => void;
  gameOver: boolean;
}

export function Board({
  cells,
  selectedCell,
  onCellClick,
  gameOver,
}: BoardProps) {
  return (
    <div className="grid grid-cols-3 gap-px bg-black dark:bg-zinc-700 border-2 sm:border-4 border-black dark:border-zinc-700 rounded">
      {cells.map((boxRow) =>
        boxRow.map((box) => {
          // Use the first cell's position as unique box identifier
          const firstCell = box[0]?.[0];
          const boxKey = firstCell
            ? `box-${firstCell.row}-${firstCell.col}`
            : `box-unknown`;
          return (
            <div
              key={boxKey}
              className="grid grid-cols-3 gap-px bg-black dark:bg-zinc-700"
            >
              {box.map((row) =>
                row.map((cell) => {
                  const isSelected =
                    selectedCell?.row === cell.row &&
                    selectedCell?.col === cell.col;
                  return (
                    <Cell
                      key={`${cell.row}-${cell.col}`}
                      cell={cell}
                      isSelected={isSelected}
                      onClick={() => onCellClick(cell.row, cell.col)}
                      disabled={gameOver}
                    />
                  );
                }),
              )}
            </div>
          );
        }),
      )}
    </div>
  );
}
