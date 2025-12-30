import type { Cell as CellType } from "src/lib/types";

interface CellProps {
  cell: CellType;
  isSelected: boolean;
  hasConflict: boolean;
  isRelatedRow: boolean;
  isRelatedCol: boolean;
  isRelatedBox: boolean;
  isSameFruit: boolean;
  onClick: () => void;
  disabled: boolean;
  fruits: string[];
}

export function Cell({
  cell,
  isSelected,
  hasConflict,
  isRelatedRow,
  isRelatedCol,
  isRelatedBox,
  isSameFruit,
  onClick,
  disabled,
  fruits,
}: CellProps) {
  const isBoxRight = cell.col % 3 === 2 && cell.col < 8;
  const isBoxBottom = cell.row % 3 === 2 && cell.row < 8;

  // Calculate background class based on priority
  const getBackgroundClass = () => {
    if (hasConflict) return "bg-red-200 dark:bg-red-900";
    if (cell.initial) return "bg-zinc-300 dark:bg-zinc-600 font-bold";
    if (isSelected) return "bg-yellow-200 dark:bg-yellow-800";
    if (isSameFruit) return "bg-orange-200 dark:bg-orange-900/60";
    if (isRelatedRow || isRelatedCol || isRelatedBox)
      return "bg-sky-100 dark:bg-sky-900/50";
    return "bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700";
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full aspect-square flex items-center justify-center text-xl sm:text-2xl md:text-3xl transition-colors ${getBackgroundClass()} ${isBoxRight ? "border-r-2 border-black dark:border-zinc-500" : ""} ${
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
