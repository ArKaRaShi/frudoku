interface GameControlsProps {
  onNewGame: () => void;
  elapsedTime: number;
}

export function GameControls({ onNewGame, elapsedTime }: GameControlsProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <button
        type="button"
        onClick={onNewGame}
        className="px-4 py-1 text-sm rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors"
      >
        เกมใหม่
      </button>

      <div className="px-4 py-1 text-sm rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono">
        {formatTime(elapsedTime)}
      </div>
    </div>
  );
}
