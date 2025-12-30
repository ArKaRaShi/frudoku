import type { Fruit } from "./fruits";

export interface Cell {
  value: Fruit | null;
  initial: boolean;
  row: number;
  col: number;
}

export type Grid = Cell[][];

export type Difficulty = "easy" | "medium" | "hard";

export interface GameState {
  grid: Grid;
  selectedCell: { row: number; col: number } | null;
  difficulty: Difficulty;
  startTime: number | null;
  gameStatus: "playing" | "won";
}
