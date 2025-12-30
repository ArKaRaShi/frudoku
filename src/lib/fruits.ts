// Legacy export for backward compatibility
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

// Dynamic fruit support
export function getFruitEmoji(n: Fruit, fruitArray: string[]): string {
  return fruitArray[n] || FRUITS[n];
}
