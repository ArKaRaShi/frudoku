# Architecture

**UI Language: All user-facing text is in Thai.**

## Import Convention
**IMPORTANT: Use `src/*` path alias for all internal imports.**
```typescript
// ✅ Correct
import { Cell } from "src/components/Cell";
import type { Grid } from "src/lib/types";

// ❌ Never use @/
import { Cell } from "@/components/Cell"; // WRONG
```

## Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **React**: Version 19.2.3 with TypeScript 5
- **Styling**: Tailwind CSS v4 with PostCSS
- **Linting/Formatting**: Biome 2.2.0 (replaces ESLint/Prettier)
- **Fonts**: Geist Sans and Geist Mono via next/font/google
- **Package Manager**: Bun
- **Hooks**: Husky 9.1.7 + lint-staged 16.2.7
- **Theming**: next-themes ^0.4.6 (dark/light mode)
- **UI Components**: Radix UI ^2.1.16 (dropdown menu)
- **Icons**: lucide-react ^0.562.0
- **State Management**: React built-in hooks (useState, useEffect, useCallback, useMemo)

## Directory Structure

```
src/
├── app/
│   ├── page.tsx              # Main game page, holds all game state
│   ├── layout.tsx            # Root layout with fonts and theme provider
│   └── globals.css           # Global styles with Tailwind directives
├── components/
│   ├── SudokuGrid.tsx        # Renders 9x9 grid, manages cell selection
│   ├── Board.tsx             # 3x3 box wrapper (9 boards)
│   ├── Cell.tsx              # Individual cell component
│   ├── FruitPicker.tsx       # 9 fruit buttons + clear button
│   ├── LandingPage.tsx       # Landing page with difficulty selection
│   ├── SettingsModal.tsx     # Settings modal for theme customization
│   └── GameMenu.tsx          # Hamburger dropdown menu (Radix UI)
├── lib/
│   ├── sudoku.ts             # generatePuzzle(), isSolved()
│   ├── types.ts              # Cell, Grid, GameState, Difficulty, Theme, Screen
│   └── themes.ts             # getFruitsForTheme(), theme definitions
```

## State (held in app/page.tsx)

```typescript
interface Cell {
	value: Fruit | null; // 0-8 or null
	initial: boolean; // pre-filled?
	row: number;
	col: number;
}

type Grid = Cell[][];

type Difficulty = "easy" | "medium" | "hard";
type Theme = "default" | "tropical" | "custom";
type Screen = "landing" | "playing" | "won";

interface GameState {
	grid: Grid;
	selectedCell: { row: number; col: number } | null;
	difficulty: Difficulty;
	startTime: number | null;
	gameStatus: "playing" | "won";
	showConflicts: boolean;
	theme: Theme;
	customFruits: string[];
}
```

## Props Flow

```
page.tsx (state holder)
    │
    ├─→ LandingPage(selectedDifficulty, onDifficultyChange, onStart, onSettings)
    │
    ├─→ SettingsModal(isOpen, onClose, currentTheme, customFruits, ...)
    │
    ├─→ SudokuGrid(grid, selectedCell, onCellClick, gameOver, conflictingCells, fruits)
    │       │
    │       └─→ Board(cells[][], onCellClick, gameOver, conflictingCells, fruits)
    │               │
    │               └─→ Cell(cell, isSelected, conflictingCells, fruits, onClick)
    │
    ├─→ FruitPicker(onFruitClick, disabled, fruits)
    │       │
    │       └─→ (updates grid[selectedCell.row][selectedCell.col].value)
    │
    └─→ GameMenu(difficulty, showConflicts, onNewGame, onToggleConflicts, onHome)
```

## lib/sudoku.ts Exports

- `generatePuzzle(difficulty): Grid` - Returns playable puzzle
- `isSolved(grid): boolean` - Check if complete & valid

## lib/themes.ts Exports

- `getFruitsForTheme(theme, customFruits): string[]` - Returns 9 fruit emojis
- `DEFAULT_FRUITS: string[]` - 🍎 🍊 🍋 🍇 🍓 🍑 🥝 🍒 🍍
- `TROPICAL_FRUITS: string[]` - 🥭 🍍 🥥 🍋 🍊 🫐 🍉 🥑 🫒

## lib/types.ts Exports

- `type Cell` - Individual cell type
- `type Grid` - 9x9 grid of cells
- `type GameState` - Complete game state
- `type Difficulty` - "easy" | "medium" | "hard"
- `type Theme` - "default" | "tropical" | "custom"
- `type Screen` - "landing" | "playing" | "won"

## Difficulty = Holes to Punch

- easy: 40 cells removed
- medium: 50 cells removed
- hard: 60 cells removed

## Local Storage Keys

- `fruit-sudoku-theme` - Current fruit theme
- `fruit-sudoku-custom-fruits` - Custom fruit selections (9 emojis)

## Theme System

- **Appearance Theme** (light/dark): Managed by next-themes, persisted automatically
- **Fruit Theme** (default/tropical/custom): Managed manually via localStorage
