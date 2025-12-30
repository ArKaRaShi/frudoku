"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { GameScreen } from "src/components/game/GameScreen";
import { WinScreen } from "src/components/game/WinScreen";
import { LandingPage } from "src/components/LandingPage";
import { SettingsModal } from "src/components/ui/SettingsModal";
import { useGameState } from "src/hooks/useGameState";

export default function Home() {
  const {
    screen,
    selectedDifficulty,
    setSelectedDifficulty,
    fruitTheme,
    setFruitTheme,
    customFruits,
    setCustomFruits,
    settingsModalOpen,
    setSettingsModalOpen,
    gameState,
    elapsedTime,
    currentFruits,
    conflictingCells,
    startGame,
    newGame,
    goToLanding,
    toggleConflicts,
    handleCellClick,
    handleFruitClick,
    canUndo,
    canRedo,
    undo,
    redo,
  } = useGameState();

  // Appearance theme (light/dark)
  const { theme: appearanceTheme, setTheme: setAppearanceTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Landing screen
  if (screen === "landing") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex flex-col items-center gap-8 py-16 px-4 w-full max-w-md relative">
          <button
            type="button"
            onClick={() =>
              setAppearanceTheme(appearanceTheme === "dark" ? "light" : "dark")
            }
            className="absolute top-4 right-4 p-2 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
            aria-label={
              mounted
                ? appearanceTheme === "dark"
                  ? "โหมดสว่าง"
                  : "โหมดมืด"
                : "สลับธีม"
            }
          >
            {mounted &&
              (appearanceTheme === "dark" ? (
                <Sun size={20} />
              ) : (
                <Moon size={20} />
              ))}
          </button>
          <LandingPage
            selectedDifficulty={selectedDifficulty}
            onDifficultyChange={setSelectedDifficulty}
            onStart={startGame}
            onSettings={() => setSettingsModalOpen(true)}
            currentFruits={currentFruits}
            mounted={mounted}
          />
          <SettingsModal
            isOpen={settingsModalOpen}
            onClose={() => setSettingsModalOpen(false)}
            currentTheme={fruitTheme}
            customFruits={customFruits}
            onThemeChange={setFruitTheme}
            onCustomFruitsChange={setCustomFruits}
          />
        </main>
      </div>
    );
  }

  // Win screen
  if (screen === "won" && gameState) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <WinScreen
          elapsedTime={elapsedTime}
          grid={gameState.grid}
          currentFruits={currentFruits}
          onNewGame={() => newGame(gameState.difficulty)}
          onHome={goToLanding}
          mounted={mounted}
          theme={appearanceTheme || "light"}
          onThemeToggle={() =>
            setAppearanceTheme(appearanceTheme === "dark" ? "light" : "dark")
          }
        />
      </div>
    );
  }

  // Playing screen
  if (!gameState) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col items-center gap-6 py-16 px-4 w-full max-w-lg">
        <GameScreen
          grid={gameState.grid}
          selectedCell={gameState.selectedCell}
          difficulty={gameState.difficulty}
          gameStatus={gameState.gameStatus}
          showConflicts={gameState.showConflicts}
          elapsedTime={elapsedTime}
          conflictingCells={conflictingCells}
          currentFruits={currentFruits}
          mounted={mounted}
          theme={appearanceTheme || "light"}
          onThemeToggle={() =>
            setAppearanceTheme(appearanceTheme === "dark" ? "light" : "dark")
          }
          onNewGame={() => newGame(gameState.difficulty)}
          onToggleConflicts={toggleConflicts}
          onHome={goToLanding}
          onCellClick={handleCellClick}
          onFruitClick={handleFruitClick}
          canUndo={canUndo}
          canRedo={canRedo}
          onUndo={undo}
          onRedo={redo}
        />
      </main>
    </div>
  );
}
