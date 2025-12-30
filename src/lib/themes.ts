import type { Theme } from "./types";

export const THEMES: Record<
  Theme,
  { name: string; nameTh: string; fruits: string[] }
> = {
  default: {
    name: "Default",
    nameTh: "ค่าเริ่มต้น",
    fruits: ["🍎", "🍊", "🍋", "🍇", "🍓", "🍑", "🥝", "🍒", "🍍"],
  },
  tropical: {
    name: "Tropical",
    nameTh: "เขตร้อน",
    fruits: ["🥥", "🥭", "🍌", "🍍", "🥝", "🍉", "🍈", "🥑", "🍅"],
  },
  custom: {
    name: "Custom",
    nameTh: "กำหนดเอง",
    fruits: ["🍎", "🍊", "🍋", "🍇", "🍓", "🍑", "🥝", "🍒", "🍍"], // fallback
  },
};

// Available emojis for custom picker
export const AVAILABLE_FRUITS = [
  "🍎",
  "🍐",
  "🍊",
  "🍋",
  "🍌",
  "🍉",
  "🍇",
  "🍓",
  "🫐",
  "🍈",
  "🍒",
  "🍑",
  "🥭",
  "🍍",
  "🥥",
  "🥝",
  "🍅",
  "🍆",
  "🥑",
  "🫑",
  "🌶️",
  "🫒",
];

// Get fruits for current theme
export function getFruitsForTheme(
  theme: Theme,
  customFruits: string[],
): string[] {
  if (theme === "custom") {
    return customFruits.length === 9 ? customFruits : THEMES.default.fruits;
  }
  return THEMES[theme].fruits;
}
