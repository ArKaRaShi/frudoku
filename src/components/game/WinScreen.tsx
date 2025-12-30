import { SudokuGrid } from "src/components/sudoku/SudokuGrid";
import { formatTime } from "src/lib/format";
import type { Grid } from "src/lib/types";
import { ThemeToggle } from "../ui/ThemeToggle";

interface WinScreenProps {
  elapsedTime: number;
  grid: Grid;
  currentFruits: string[];
  onNewGame: () => void;
  onHome: () => void;
  mounted: boolean;
  theme: string;
  onThemeToggle: () => void;
}

export function WinScreen({
  elapsedTime,
  grid,
  currentFruits,
  onNewGame,
  onHome,
  mounted,
  theme,
  onThemeToggle,
}: WinScreenProps) {
  return (
    <div className="flex flex-col items-center gap-8 py-16 px-4 w-full max-w-lg relative">
      {/* Theme toggle button */}
      <ThemeToggle mounted={mounted} theme={theme} onToggle={onThemeToggle} />
      <div className="px-8 py-6 bg-green-100 dark:bg-green-900 rounded-2xl text-center">
        <h2 className="text-4xl font-bold text-green-800 dark:text-green-200 mb-2">
          คุณชนะแล้ว! 🎉
        </h2>
        <p className="text-lg text-green-700 dark:text-green-300">
          เวลา: {formatTime(elapsedTime)}
        </p>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => onNewGame()}
          className="px-8 py-3 text-lg font-semibold rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors"
        >
          เล่นอีกครั้ง
        </button>
        <button
          type="button"
          onClick={onHome}
          className="px-8 py-3 text-lg font-semibold rounded-full bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
        >
          หน้าหลัก
        </button>
      </div>

      <SudokuGrid
        grid={grid}
        selectedCell={null}
        onCellClick={() => {}}
        gameOver={true}
        conflictingCells={new Set()}
        fruits={currentFruits}
      />
    </div>
  );
}
