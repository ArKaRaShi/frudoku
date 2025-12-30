import type { Fruit } from "./fruits";

export interface Cell {
  value: Fruit | null;
  initial: boolean;
  row: number;
  col: number;
  notes: number[]; // Array of fruit indices (0-8) for pencil marks
}

export type Grid = Cell[][];

export type Difficulty = "easy" | "medium" | "hard";

export type Screen = "landing" | "playing" | "won";

export type Theme = "default" | "tropical" | "custom";

export interface GameState {
  grid: Grid;
  selectedCell: { row: number; col: number } | null;
  difficulty: Difficulty;
  startTime: number | null;
  gameStatus: "playing" | "won";
  showConflicts: boolean;
  theme: Theme;
  customFruits: string[]; // Array of 9 emojis for custom theme
  history: Grid[]; // Array of past grid states (cell values only)
  historyIndex: number; // Current position in history (-1 when empty)
  noteMode: boolean; // When true, fruit clicks toggle notes instead of placing
}
