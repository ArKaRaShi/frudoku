# 📋 Execution Plan: Undo/Redo System

**Reference:** PHASE 11, Feature 11.1

**User Decisions:**
- **Trigger:** Buttons only (no keyboard, no gestures)
- **Location:** GameInfoBar only (not in dropdown menu)
- **Layout:** 2-layer structure (see Task 2.4)
- **History Scope:** Cell values only (timer unaffected)

---

## 🛠️ Step 1: Foundation (Setup & Data)

### Task 1.1 - Extend GameState type

**File:** `src/lib/types.ts`

Add to `GameState` interface:

```typescript
history: Grid[];        // Array of past grid states (cell values only)
historyIndex: number;   // Current position in history (-1 when empty)
```

**File:** `src/lib/sudoku.ts`
Add constant:

```typescript
export const MAX_HISTORY_DEPTH = 50;
```

### Task 1.2 - Create deep clone utility

**File:** `src/lib/sudoku.ts`

Add function:

```typescript
export function cloneGrid(grid: Grid): Grid {
	return grid.map((row) => row.map((cell) => ({ ...cell })));
}
```

---

## 💻 Step 2: Implementation (Logic & UI)

### Task 2.1 - Implement history tracking

**File:** `src/hooks/useGameState.ts`

Modify `handleFruitClick` to save state before changes:

-   Push current `grid` to `history` array before mutation
-   Update `historyIndex` to point to new state
-   Implement depth limit: `if (history.length > MAX_HISTORY_DEPTH) history.shift()`
-   Handle branch: when undoing then making new move, truncate forward history:
    ```typescript
    // If we're in the middle of history and make a new move,
    // remove all future states before pushing new one
    if (historyIndex < history.length - 1) {
      history = history.slice(0, historyIndex + 1);
    }
    ```

Initialize history in `startGame` and `newGame`:

```typescript
history: [],
historyIndex: -1,
```

**Important:** Timer continues regardless of undo/redo. Only grid state is restored.

### Task 2.2 - Implement undo/redo callbacks

**File:** `src/hooks/useGameState.ts`

```typescript
const undo = useCallback(() => {
	setGameState((prev) => {
		if (!prev || prev.historyIndex <= 0) return prev;
		const newIndex = prev.historyIndex - 1;
		return {
			...prev,
			grid: cloneGrid(prev.history[newIndex]),
			historyIndex: newIndex,
			// Timer and other state remain unchanged
		};
	});
}, []);

const redo = useCallback(() => {
	setGameState((prev) => {
		if (!prev || prev.historyIndex >= prev.history.length - 1) return prev;
		const newIndex = prev.historyIndex + 1;
		return {
			...prev,
			grid: cloneGrid(prev.history[newIndex]),
			historyIndex: newIndex,
			// Timer and other state remain unchanged
		};
	});
}, []);
```

Export from hook return object:

```typescript
return {
  // ... existing exports
  undo,
  redo,
  canUndo: gameState?.historyIndex ?? 0 > 0,
  canRedo: gameState ? gameState.historyIndex < gameState.history.length - 1 : false,
};
```

### Task 2.3 - Create UndoRedoControls component

**File:** `src/components/game/UndoRedoControls.tsx`

```typescript
"use client";

import { Undo, Redo } from "lucide-react";

interface UndoRedoControlsProps {
	canUndo: boolean;
	canRedo: boolean;
	onUndo: () => void;
	onRedo: () => void;
}

export function UndoRedoControls({
	canUndo,
	canRedo,
	onUndo,
	onRedo,
}: UndoRedoControlsProps) {
	return (
		<div className="flex items-center gap-1">
			<button
				type="button"
				onClick={onUndo}
				disabled={!canUndo}
				className={`p-2 rounded-lg transition-colors ${
					canUndo
						? "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
						: "opacity-50 cursor-not-allowed text-zinc-400 dark:text-zinc-600"
				}`}
				aria-label="ย้อนกลับ"
				title="ย้อนกลับ"
			>
				<Undo size={16} />
			</button>
			<button
				type="button"
				onClick={onRedo}
				disabled={!canRedo}
				className={`p-2 rounded-lg transition-colors ${
					canRedo
						? "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
						: "opacity-50 cursor-not-allowed text-zinc-400 dark:text-zinc-600"
				}`}
				aria-label="ทำซ้ำ"
				title="ทำซ้ำ"
			>
				<Redo size={16} />
			</button>
		</div>
	);
}
```

### Task 2.4 - Integrate into GameInfoBar

**File:** `src/components/game/GameInfoBar.tsx`

-   Import `UndoRedoControls`
-   Add props: `canUndo`, `canRedo`, `onUndo`, `onRedo`

**New 2-layer layout:**

```
┌─────────────────────────────────────────────────┐
│ [↩️↪️] justify-between [🌙/☀️] [≡ เมนู] │  ← Row 1
├─────────────────────────────────────────────────┤
│ [Difficulty] justify-between [Time: 00:00]      │  ← Row 2
└─────────────────────────────────────────────────┘
```

**Mobile layout:**
- Row 1: UndoRedoControls (left) | ThemeToggle (center) | GameMenu (right)
- Row 2: Difficulty label (left) | Timer (right)

**Desktop layout:**
- Row 1: UndoRedoControls (left) | ThemeToggle + GameMenu (right)
- Row 2: Difficulty label (left) | Timer (right)

---

## ✅ Step 3: Verification (Test & Deploy)

### Task 3.1 - Test functionality

-   [ ] Place fruit → undo → verify cell cleared
-   [ ] Multiple undos → verify correct state restoration
-   [ ] Undo then redo → verify forward restoration
-   [ ] New move after undo → verify history truncation (redo disabled)
-   [ ] Timer continues during undo/redo (unaffected)
-   [ ] Buttons in InfoBar work correctly
-   [ ] Buttons correctly disable when no history available
-   [ ] Run `bun run lint` to verify Biome compliance

---

## Done Criteria

Players can undo/redo moves via icon buttons in GameInfoBar, history tracks cell values only (timer unaffected), buttons correctly disable when no history available.

---

## Files to Modify

| File                                       | Action                                                  |
| ------------------------------------------ | ------------------------------------------------------- |
| `src/lib/types.ts`                         | Add history fields to GameState                         |
| `src/lib/sudoku.ts`                        | Add MAX_HISTORY_DEPTH, cloneGrid()                      |
| `src/hooks/useGameState.ts`                | Implement history tracking, undo/redo callbacks, export canUndo/canRedo |
| `src/components/game/UndoRedoControls.tsx` | **NEW** - Create component                              |
| `src/components/game/GameInfoBar.tsx`      | Integrate UndoRedoControls                              |
