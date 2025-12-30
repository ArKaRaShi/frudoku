import type { Difficulty } from "src/lib/types";

interface GameControlsProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onNewGame: () => void;
  elapsedTime: number;
}

export function GameControls({
  difficulty,
  onDifficultyChange,
  onNewGame,
  elapsedTime,
}: GameControlsProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-zinc-600 dark:text-zinc-400">
          Difficulty:
        </span>
        {(["easy", "medium", "hard"] as const).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => onDifficultyChange(d)}
            className={`px-3 py-1 text-sm rounded-full capitalize transition-colors ${
              difficulty === d
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={onNewGame}
        className="px-4 py-1 text-sm rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors"
      >
        New Game
      </button>

      <div className="px-4 py-1 text-sm rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono">
        {formatTime(elapsedTime)}
      </div>
    </div>
  );
}
