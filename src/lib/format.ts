import type { Difficulty } from "./types";

/**
 * Format seconds as MM:SS
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

/**
 * Get Thai label for difficulty level
 */
export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: "ง่าย",
  medium: "ปานกลาง",
  hard: "ยาก",
};

export function getDifficultyLabel(difficulty: Difficulty): string {
  return DIFFICULTY_LABELS[difficulty];
}
