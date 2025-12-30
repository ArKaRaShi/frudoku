import { Pencil, X } from "lucide-react";
import type { Fruit } from "src/lib/fruits";

interface FruitPickerProps {
  onFruitClick: (fruit: Fruit | null) => void;
  disabled: boolean;
  fruits: string[];
  noteMode: boolean;
  onToggleNoteMode: () => void;
}

export function FruitPicker({
  onFruitClick,
  disabled,
  fruits,
  noteMode,
  onToggleNoteMode,
}: FruitPickerProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {([0, 1, 2, 3, 4, 5, 6, 7, 8] as const).map((fruit) => (
        <button
          key={fruit}
          type="button"
          onClick={() => onFruitClick(fruit)}
          className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-xl sm:text-2xl md:text-3xl rounded-full transition-transform hover:scale-110 active:scale-95 ${
            disabled
              ? "bg-zinc-200 dark:bg-zinc-800 opacity-50 cursor-not-allowed"
              : "bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          }`}
          disabled={disabled}
          aria-label={`Select ${fruits[fruit]}`}
        >
          {fruits[fruit]}
        </button>
      ))}
      {/* Clear/Empty button */}
      <button
        type="button"
        onClick={() => onFruitClick(null)}
        className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-xl sm:text-2xl md:text-3xl rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center ${
          disabled
            ? "bg-zinc-200 dark:bg-zinc-800 opacity-50 cursor-not-allowed"
            : "bg-white dark:bg-zinc-900 border-2 border-dashed border-red-400 dark:border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30"
        }`}
        disabled={disabled}
        aria-label="ลบผลไม้"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" strokeWidth={2} />
      </button>
      {/* Notes toggle button */}
      <button
        type="button"
        onClick={onToggleNoteMode}
        className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full transition-all hover:scale-110 active:scale-95 flex items-center justify-center ${
          noteMode
            ? "bg-blue-500 text-white ring-2 ring-blue-300 dark:ring-blue-600"
            : disabled
              ? "bg-zinc-200 dark:bg-zinc-800 opacity-50 cursor-not-allowed"
              : "bg-white dark:bg-zinc-900 border-2 border-blue-400 dark:border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30"
        }`}
        disabled={disabled}
        aria-label="โน้ตเขียนตัวเลข"
        title="โน้ตเขียนตัวเลข"
      >
        <Pencil
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
          strokeWidth={2}
        />
      </button>
    </div>
  );
}
