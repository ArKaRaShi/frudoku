# Refactor v1: Component Organization

## Goal

Refactor `page.tsx` (415 lines) by extracting components into organized groups.

## Current State

```
src/
├── app/
│   └── page.tsx          # 415 lines - too big
├── components/           # 10 files flat
├── lib/
└── hooks/                # doesn't exist yet
```

## Proposed Structure

```
src/
├── app/
│   └── page.tsx          # ~50 lines - just routing
├── components/
│   ├── game/             # Game-specific components
│   │   ├── GameScreen.tsx
│   │   ├── GameInfoBar.tsx
│   │   └── WinScreen.tsx
│   ├── ui/               # Reusable UI components
│   │   └── ThemeToggle.tsx
│   └── sudoku/           # Sudoku board components
│       ├── SudokuGrid.tsx
│       ├── Board.tsx
│       └── Cell.tsx
├── hooks/                # Custom React hooks
│   └── useGameState.ts
└── lib/
```

## Files to Create

### 1. `src/hooks/useGameState.ts`
Extract all game state management from `page.tsx`:
- State: `screen`, `selectedDifficulty`, `fruitTheme`, `customFruits`, `gameState`, `elapsedTime`
- Effects: timer, storage sync, conflict calculation
- Callbacks: `startGame`, `newGame`, `handleCellClick`, `handleFruitClick`, etc.

**Exports:** `useGameState()` hook returning all state and callbacks

### 2. `src/components/ui/ThemeToggle.tsx`
Extract the repeated theme toggle button (appears 3× in page.tsx):
- Props: `mounted`, `theme`, `onToggle`
- Reusable in all screens

### 3. `src/components/game/GameInfoBar.tsx`
Extract info bar component (lines 308-388 in page.tsx):
- Mobile layout: theme toggle + menu + timer + difficulty
- Desktop layout: difficulty + timer + theme toggle + menu
- Props: `difficulty`, `elapsedTime`, `mounted`, `theme`, `onThemeToggle`, `onNewGame`, `onToggleConflicts`, `onHome`

### 4. `src/components/game/WinScreen.tsx`
Extract win screen (lines 238-300 in page.tsx):
- "คุณชนะแล้ว! 🎉" message
- Time display
- "เล่นอีกครั้ง" and "หน้าหลัก" buttons
- Completed SudokuGrid display
- Props: `difficulty`, `elapsedTime`, `grid`, `currentFruits`, `onNewGame`, `onHome`, `mounted`, `theme`, `onThemeToggle`

### 5. `src/components/game/GameScreen.tsx`
Extract playing screen (lines 302-414 in page.tsx):
- Combines GameInfoBar + SudokuGrid + FruitPicker
- Props: all needed from game state

### 6. Move existing files
- `SudokuGrid.tsx` → `src/components/sudoku/`
- `Board.tsx` → `src/components/sudoku/`
- `Cell.tsx` → `src/components/sudoku/`

### 7. Update `src/app/page.tsx`
Final simplified version (~50 lines):
```tsx
"use client";

import { useGameState } from "src/hooks/useGameState";
import { GameScreen } from "src/components/game/GameScreen";
import { WinScreen } from "src/components/game/WinScreen";
import { LandingPage } from "src/components/LandingPage";
import { SettingsModal } from "src/components/SettingsModal";

export default function Home() {
  const gameState = useGameState();

  if (gameState.screen === "landing") {
    return <LandingScreen {...} />;
  }

  if (gameState.screen === "won") {
    return <WinScreen {...} />;
  }

  return <GameScreen {...} />;
}
```

## Files to Update

After moving files, update imports in:
- `src/app/page.tsx`
- `src/components/sudoku/SudokuGrid.tsx` (imports Board)
- `src/components/sudoku/Board.tsx` (imports Cell)

## Execution Steps

1. Create directories: `src/components/game`, `src/components/ui`, `src/components/sudoku`, `src/hooks`
2. Create `ThemeToggle.tsx` in `ui/`
3. Move `SudokuGrid.tsx`, `Board.tsx`, `Cell.tsx` to `sudoku/`
4. Update imports in moved files
5. Create `useGameState.ts` hook
6. Create `GameInfoBar.tsx` in `game/`
7. Create `WinScreen.tsx` in `game/`
8. Create `GameScreen.tsx` in `game/`
9. Rewrite `page.tsx` to use new structure
10. Run `bun run check:write` to verify
11. Test build

## Status

- [x] Create directories
- [x] Create ThemeToggle.tsx
- [x] Move sudoku components
- [x] Create useGameState hook
- [x] Create GameInfoBar.tsx
- [x] Create WinScreen.tsx
- [x] Create GameScreen.tsx
- [x] Update page.tsx
- [x] Fix all imports
- [x] Verify with linter
