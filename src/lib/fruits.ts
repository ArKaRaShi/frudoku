export const FRUITS = [
  "🍎",
  "🍊",
  "🍋",
  "🍇",
  "🍓",
  "🍑",
  "🥝",
  "🍒",
  "🍍",
] as const;

export type Fruit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export function fruitEmoji(n: Fruit): string {
  return FRUITS[n];
}
