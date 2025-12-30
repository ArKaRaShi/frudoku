import { GameMenu } from "src/components/game/GameMenu";
import { UndoRedoControls } from "src/components/game/UndoRedoControls";
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
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
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
  canUndo,
  canRedo,
  onUndo,
  onRedo,
}: GameInfoBarProps) {
  // Mobile layout: 2-layer structure
  const mobileLayout = (
    <div className="flex flex-col items-end gap-2 w-full sm:hidden">
      <div className="flex items-center justify-between w-full">
        <UndoRedoControls
          canUndo={canUndo}
          canRedo={canRedo}
          onUndo={onUndo}
          onRedo={onRedo}
        />
        <div className="flex items-center gap-3">
          <ThemeToggle
            mounted={mounted}
            theme={theme}
            onToggle={onThemeToggle}
          />
          <GameMenu
            difficulty={difficulty}
            showConflicts={showConflicts}
            onNewGame={onNewGame}
            onToggleConflicts={onToggleConflicts}
            onHome={onHome}
          />
        </div>
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

  // Desktop layout: 2-layer structure
  const desktopLayout = (
    <div className="hidden sm:flex flex-col gap-2 w-full text-sm">
      <div className="flex items-center justify-between w-full">
        <UndoRedoControls
          canUndo={canUndo}
          canRedo={canRedo}
          onUndo={onUndo}
          onRedo={onRedo}
        />
        <div className="flex items-center gap-3">
          <ThemeToggle
            mounted={mounted}
            theme={theme}
            onToggle={onThemeToggle}
          />
          <GameMenu
            difficulty={difficulty}
            showConflicts={showConflicts}
            onNewGame={onNewGame}
            onToggleConflicts={onToggleConflicts}
            onHome={onHome}
          />
        </div>
      </div>
      <div className="flex items-center justify-between w-full">
        <span className="text-zinc-600 dark:text-zinc-400">
          {getDifficultyLabel(difficulty)}
        </span>
        <span className="text-zinc-600 dark:text-zinc-400">
          <span className="font-mono font-semibold text-zinc-800 dark:text-zinc-200">
            {formatTime(elapsedTime)}
          </span>
        </span>
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
