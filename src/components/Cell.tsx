import type { Cell as CellType } from "src/lib/types";

interface CellProps {
  cell: CellType;
  isSelected: boolean;
  hasConflict: boolean;
  onClick: () => void;
  disabled: boolean;
  fruits: string[];
}

export function Cell({
  cell,
  isSelected,
  hasConflict,
  onClick,
  disabled,
  fruits,
}: CellProps) {
  const isBoxRight = cell.col % 3 === 2 && cell.col < 8;
  const isBoxBottom = cell.row % 3 === 2 && cell.row < 8;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center text-xl sm:text-2xl transition-colors ${
        hasConflict
          ? "bg-red-200 dark:bg-red-900"
          : cell.initial
            ? "bg-zinc-300 dark:bg-zinc-600 font-bold"
            : isSelected
              ? "bg-yellow-200 dark:bg-yellow-800"
              : "bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700"
      } ${isBoxRight ? "border-r-2 border-black dark:border-zinc-500" : ""} ${
        isBoxBottom ? "border-b-2 border-black dark:border-zinc-500" : ""
      }`}
      disabled={disabled || cell.initial}
      aria-label={`Cell ${cell.row + 1}, ${cell.col + 1}${
        cell.value !== null ? ` containing ${fruits[cell.value]}` : " empty"
      }${hasConflict ? " (conflict)" : ""}`}
    >
      {cell.value !== null ? fruits[cell.value] : ""}
    </button>
  );
}
