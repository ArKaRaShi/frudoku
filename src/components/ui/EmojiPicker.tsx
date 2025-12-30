import { AVAILABLE_FRUITS } from "src/lib/themes";

interface EmojiPickerProps {
  selected: string[];
  onChange: (fruits: string[]) => void;
}

export function EmojiPicker({ selected, onChange }: EmojiPickerProps) {
  // We have 9 slots (0-8)
  const slots = 9;

  const handleEmojiClick = (emoji: string) => {
    // Check if emoji is already selected - if so, don't allow duplicate
    if (selected.includes(emoji)) {
      return;
    }

    // Find first empty slot or don't allow if full
    const newSelected = [...selected];
    const emptyIndex = newSelected.indexOf("");

    if (emptyIndex !== -1) {
      newSelected[emptyIndex] = emoji;
      onChange(newSelected);
    }
    // If all slots are filled, do nothing (user must clear a slot first)
  };

  const handleSlotClick = (index: number) => {
    // Clear the slot
    const newSelected = [...selected];
    newSelected[index] = "";
    onChange(newSelected);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* 9 slots for selected fruits */}
      <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 gap-1 justify-items-center">
        {Array.from({ length: slots }).map((_, index) => (
          <button
            key={`slot-${index}-${selected[index] || "empty"}`}
            type="button"
            onClick={() => handleSlotClick(index)}
            className={`w-9 h-9 sm:w-10 sm:h-10 text-xl sm:text-2xl rounded-full border-2 transition-colors ${
              selected[index]
                ? "border-black dark:border-zinc-600 bg-white dark:bg-zinc-900 hover:bg-red-50 dark:hover:bg-red-900/30"
                : "border-dashed border-zinc-400 dark:border-zinc-600 bg-transparent"
            }`}
            aria-label={`Slot ${index + 1}: ${selected[index] || "empty"}`}
          >
            {selected[index] || <span className="text-zinc-400">+</span>}
          </button>
        ))}
      </div>

      {/* Available fruits to pick from */}
      <div className="flex flex-wrap justify-center gap-2 max-h-40 overflow-y-auto p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
        {AVAILABLE_FRUITS.map((emoji) => {
          const isSelected = selected.includes(emoji);
          return (
            <button
              key={emoji}
              type="button"
              onClick={() => handleEmojiClick(emoji)}
              disabled={isSelected}
              className={`w-8 h-8 sm:w-9 sm:h-9 text-xl sm:text-xl rounded-full border transition-all ${
                isSelected
                  ? "bg-zinc-300 dark:bg-zinc-700 border-zinc-400 dark:border-zinc-600 opacity-50 cursor-not-allowed"
                  : "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 hover:border-black dark:hover:border-zinc-500 hover:scale-110"
              }`}
              aria-label={`Select ${emoji}${
                isSelected ? " (already selected)" : ""
              }`}
            >
              {emoji}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
        {selected.filter((f) => f !== "").length}/9 ผลไม้ • แตะช่องว่างเพื่อลบ •
        แตะผลไม้เพื่อเลือก
      </p>
    </div>
  );
}
