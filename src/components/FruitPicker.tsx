import { type Fruit, fruitEmoji } from "src/lib/fruits";

interface FruitPickerProps {
  onFruitClick: (fruit: Fruit) => void;
  disabled: boolean;
}

export function FruitPicker({ onFruitClick, disabled }: FruitPickerProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {([0, 1, 2, 3, 4, 5, 6, 7, 8] as const).map((fruit) => (
        <button
          key={fruit}
          type="button"
          onClick={() => onFruitClick(fruit)}
          className={`w-12 h-12 sm:w-14 sm:h-14 text-2xl sm:text-3xl rounded-full transition-transform hover:scale-110 active:scale-95 ${
            disabled
              ? "bg-zinc-200 dark:bg-zinc-800 opacity-50 cursor-not-allowed"
              : "bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          }`}
          disabled={disabled}
          aria-label={`Select ${fruitEmoji(fruit)}`}
        >
          {fruitEmoji(fruit)}
        </button>
      ))}
    </div>
  );
}
