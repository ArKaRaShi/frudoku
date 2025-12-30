# Architecture

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

-   **Framework**: Next.js 16 (App Router)
-   **React**: Version 19.2.3 with TypeScript
-   **Styling**: Tailwind CSS v4 with PostCSS
-   **Linting/Formatting**: Biome (replaces ESLint/Prettier)
-   **Fonts**: Geist Sans and Geist Mono via next/font/google
-   **Package Manager**: Bun
-   **State Management**: React built-in hooks (useState, useEffect)
-   **No external UI libraries** - custom components with Tailwind

## Directory Structure

```
src/
├── app/
│   ├── page.tsx              # Main game page, holds all game state
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── SudokuGrid.tsx        # Renders 9x9 grid, manages cell selection
│   ├── Board.tsx             # 3x3 box wrapper (9 boards)
│   ├── Cell.tsx              # Individual cell component
│   ├── FruitPicker.tsx       # 9 fruit buttons
│   └── GameControls.tsx      # Difficulty, New Game, Timer display
├── lib/
│   ├── sudoku.ts             # generatePuzzle(), isValidMove(), isSolved()
│   └── types.ts              # Cell, Grid, GameState, Fruit
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

interface GameState {
	grid: Grid;
	selectedCell: { row: number; col: number } | null;
	difficulty: "easy" | "medium" | "hard";
	startTime: number | null;
	gameStatus: "playing" | "won";
}
```

## Props Flow

```
page.tsx (state holder)
    │
    ├─→ SudokuGrid(grid, selectedCell, onCellClick)
    │       │
    │       └─→ Board(cells[][], onCellClick)
    │               │
    │               └─→ Cell(cell, isSelected, onClick)
    │
    ├─→ FruitPicker(onFruitClick)
    │       │
    │       └─→ (updates grid[selectedCell.row][selectedCell.col].value)
    │
    └─→ GameControls(difficulty, onNewGame, elapsedTime)
```

## lib/sudoku.ts Exports

-   `generatePuzzle(difficulty): Grid` - Returns playable puzzle
-   `isSolved(grid): boolean` - Check if complete & valid
-   `isValidMove(grid, row, col, value): boolean` - Validation helper

## Fruit Constants (lib/fruits.ts)

```typescript
export const FRUITS = [
	"🍎",
	"🍊",
	"🍋",
	"🍇",
	"🍓",
	"🍑",
	"🥝",
	"🍒",
	"🍍",
] as const;
export type Fruit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export const fruitEmoji = (n: number): string => FRUITS[n];
```

## Difficulty = Holes to Punch

-   easy: 40 cells removed
-   medium: 50 cells removed
-   hard: 60 cells removed
