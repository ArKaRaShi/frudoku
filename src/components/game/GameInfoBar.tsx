import { GameMenu } from "src/components/game/GameMenu";
import { formatTime, getDifficultyLabel } from "src/lib/format";
import type { Difficulty } from "src/lib/types";
import { ThemeToggle } from "../ui/ThemeToggle";

interface GameInfoBarProps {
  difficulty: Difficulty;
  elapsedTime: number;
  mounted: boolean;
  theme: string;
  onThemeToggle: () => void;
  onNewGame: () => void;
  onToggleConflicts: () => void;
  onHome: () => void;
  showConflicts: boolean;
}

export function GameInfoBar({
  difficulty,
  elapsedTime,
  mounted,
  theme,
  onThemeToggle,
  onNewGame,
  onToggleConflicts,
  onHome,
  showConflicts,
}: GameInfoBarProps) {
  // Mobile layout
  const mobileLayout = (
    <div className="flex flex-col items-end gap-2 w-full sm:hidden">
      <div className="flex items-center gap-3 w-full justify-end">
        <ThemeToggle mounted={mounted} theme={theme} onToggle={onThemeToggle} />
        <GameMenu
          difficulty={difficulty}
          showConflicts={showConflicts}
          onNewGame={onNewGame}
          onToggleConflicts={onToggleConflicts}
          onHome={onHome}
        />
      </div>
      <div className="flex justify-between w-full">
        <span className="text-zinc-600 dark:text-zinc-400 text-sm self-start">
          {getDifficultyLabel(difficulty)}
        </span>
        <span className="text-zinc-600 dark:text-zinc-400 text-sm">
          <span className="font-mono font-semibold text-zinc-800 dark:text-zinc-200">
            {formatTime(elapsedTime)}
          </span>
        </span>
      </div>
    </div>
  );

  // Desktop layout
  const desktopLayout = (
    <div className="hidden sm:flex items-center justify-between w-full text-sm relative">
      <span className="text-zinc-600 dark:text-zinc-400">
        {getDifficultyLabel(difficulty)}
      </span>
      <div className="flex items-center gap-3">
        <span className="text-zinc-600 dark:text-zinc-400">
          <span className="font-mono font-semibold text-zinc-800 dark:text-zinc-200">
            {formatTime(elapsedTime)}
          </span>
        </span>
        <ThemeToggle mounted={mounted} theme={theme} onToggle={onThemeToggle} />
        <GameMenu
          difficulty={difficulty}
          showConflicts={showConflicts}
          onNewGame={onNewGame}
          onToggleConflicts={onToggleConflicts}
          onHome={onHome}
        />
      </div>
    </div>
  );

  return (
    <>
      {mobileLayout}
      {desktopLayout}
    </>
  );
}
