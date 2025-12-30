import { fruitEmoji } from "src/lib/fruits";
import type { Cell as CellType } from "src/lib/types";

interface CellProps {
  cell: CellType;
  isSelected: boolean;
  onClick: () => void;
  disabled: boolean;
}

export function Cell({ cell, isSelected, onClick, disabled }: CellProps) {
  const isBoxRight = (cell.col + 1) % 3 === 0 && cell.col < 8;
  const isBoxBottom = (cell.row + 1) % 3 === 0 && cell.row < 8;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-2xl transition-colors ${
        cell.initial
          ? "bg-zinc-300 dark:bg-zinc-700 font-bold"
          : isSelected
            ? "bg-yellow-200 dark:bg-yellow-800"
            : "bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800"
      } ${isBoxRight ? "border-r-2 border-black dark:border-zinc-600" : ""} ${
        isBoxBottom ? "border-b-2 border-black dark:border-zinc-600" : ""
      }`}
      disabled={disabled || cell.initial}
      aria-label={`Cell ${cell.row + 1}, ${cell.col + 1}${
        cell.value !== null ? ` containing ${fruitEmoji(cell.value)}` : " empty"
      }`}
    >
      {cell.value !== null ? fruitEmoji(cell.value) : ""}
    </button>
  );
}
