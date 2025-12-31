import type { Grid } from "src/lib/types";
import { Cell } from "./Cell";

interface BoardProps {
  cells: Grid[][];
  selectedCell: { row: number; col: number } | null;
  onCellClick: (row: number, col: number) => void;
  gameOver: boolean;
  conflictingCells: Set<string>;
  fruits: string[];
}

// Helper to check if cell is in same 3x3 box as selected cell
function isInSameBox(
  cellRow: number,
  cellCol: number,
  selectedRow: number,
  selectedCol: number,
): boolean {
  const boxRow = Math.floor(cellRow / 3);
  const boxCol = Math.floor(cellCol / 3);
  const selectedBoxRow = Math.floor(selectedRow / 3);
  const selectedBoxCol = Math.floor(selectedCol / 3);
  return boxRow === selectedBoxRow && boxCol === selectedBoxCol;
}

// Helper to get the value of the selected cell from the grid
function getSelectedCellValue(
  cells: Grid[][],
  selectedCell: { row: number; col: number },
): number | null {
  const boxRow = Math.floor(selectedCell.row / 3);
  const boxCol = Math.floor(selectedCell.col / 3);
  const cellRowInBox = selectedCell.row % 3;
  const cellColInBox = selectedCell.col % 3;

  return cells[boxRow]?.[boxCol]?.[cellRowInBox]?.[cellColInBox]?.value ?? null;
}

export function Board({
  cells,
  selectedCell,
  onCellClick,
  gameOver,
  conflictingCells,
  fruits,
}: BoardProps) {
  // Get the value of the selected cell for same-fruit highlighting
  const selectedValue =
    selectedCell !== null ? getSelectedCellValue(cells, selectedCell) : null;

  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-px bg-black dark:bg-zinc-500 border-2 sm:border-4 border-black dark:border-zinc-500 rounded w-full max-w-sm sm:max-w-md md:max-w-lg aspect-square mx-auto">
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
              className="grid grid-cols-3 grid-rows-3 gap-px bg-black dark:bg-zinc-500 w-full h-full"
            >
              {box.map((row) =>
                row.map((cell) => {
                  const isSelected =
                    selectedCell?.row === cell.row &&
                    selectedCell?.col === cell.col;
                  const hasConflict = conflictingCells.has(
                    `${cell.row}-${cell.col}`,
                  );
                  const isRelatedRow = selectedCell?.row === cell.row;
                  const isRelatedCol = selectedCell?.col === cell.col;
                  const isRelatedBox =
                    selectedCell !== null
                      ? isInSameBox(
                          cell.row,
                          cell.col,
                          selectedCell.row,
                          selectedCell.col,
                        )
                      : false;
                  const isSameFruit =
                    selectedValue !== null && cell.value === selectedValue;
                  return (
                    <Cell
                      key={`${cell.row}-${cell.col}`}
                      cell={cell}
                      isSelected={isSelected}
                      hasConflict={hasConflict}
                      isRelatedRow={isRelatedRow}
                      isRelatedCol={isRelatedCol}
                      isRelatedBox={isRelatedBox}
                      isSameFruit={isSameFruit}
                      onClick={() => onCellClick(cell.row, cell.col)}
                      disabled={gameOver}
                      fruits={fruits}
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
