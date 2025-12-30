# 📋 Execution Plan: Notes/Pencil Marks Mode

**Reference:** PHASE 11, Feature 11.2

**User Decisions:**
- **Toggle placement**: In FruitPicker (with other fruit buttons)
- **Notes rendering**: 3x3 mini grid (standard Sudoku style)
- **Smart clearing**: Conservative (clear from row/col/box only)

---

## 🛠️ Step 1: Foundation (Setup & Data)

### Task 1.1 - Extend Cell type with notes support

**File:** `src/lib/types.ts`

```typescript
export interface Cell {
  value: Fruit | null;
  initial: boolean;
  row: number;
  col: number;
  notes: number[]; // NEW - Array of fruit indices (0-8) for pencil marks
}
```

### Task 1.2 - Add noteMode to GameState

**File:** `src/lib/types.ts`

```typescript
export interface GameState {
  grid: Grid;
  selectedCell: { row: number; col: number } | null;
  difficulty: Difficulty;
  startTime: number | null;
  gameStatus: "playing" | "won";
  showConflicts: boolean;
  theme: Theme;
  customFruits: string[];
  history: Grid[];
  historyIndex: number;
  noteMode: boolean; // NEW - When true, fruit clicks toggle notes instead of placing
}
```

Initialize to `false` in `startGame` and `newGame` callbacks.

### Task 1.3 - Add toggleConflicts callback

**File:** `src/hooks/useGameState.ts`

Add `toggleNoteMode` callback:

```typescript
const toggleNoteMode = useCallback(() => {
  setGameState((prev) => {
    if (!prev) return null;
    return { ...prev, noteMode: !prev.noteMode };
  });
}, []);
```

Export from return value.

---

## 💻 Step 2: Implementation (Logic & UI)

### Task 2.1 - Update handleFruitClick for note mode

**File:** `src/hooks/useGameState.ts`

Modify to handle two modes:

```typescript
const handleFruitClick = useCallback((fruit: number | null) => {
  setGameState((prev) => {
    if (!prev || !prev.selectedCell || prev.gameStatus === "won") {
      return prev;
    }

    const { row, col } = prev.selectedCell;
    const cell = prev.grid[row][col];

    // Note mode: toggle fruit in notes array
    if (prev.noteMode && fruit !== null) {
      const newNotes = cell.notes.includes(fruit)
        ? cell.notes.filter((n) => n !== fruit) // Remove if exists
        : [...cell.notes, fruit].sort((a, b) => a - b); // Add if not

      const newGrid = prev.grid.map((r) =>
        r.map((c) => {
          if (c.row === row && c.col === col) {
            return { ...c, notes: newNotes };
          }
          return c;
        }),
      );

      return { ...prev, grid: newGrid };
    }

    // Normal mode: place fruit (existing logic)
    // ... (existing placement code)
  });
}, []);
```

### Task 2.2 - Auto-clear notes when placing fruit

**File:** `src/hooks/useGameState.ts`

When placing a fruit, clear notes from that cell:

```typescript
// In normal mode, when placing fruit:
const newGrid = prev.grid.map((r) =>
  r.map((c) => {
    if (c.row === row && c.col === col) {
      return {
        ...c,
        value: fruit === null ? null : (fruit as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8),
        notes: [], // Clear notes when fruit is placed
      };
    }
    return c;
  }),
);
```

### Task 2.3 - Smart note clearing (USER DECISION REQUIRED)

**File:** `src/hooks/useGameState.ts`

**Option A - Conservative**: Clear placed fruit from notes only in the same row/col/box
**Option B - Aggressive**: Clear placed fruit from ALL notes on the board

```typescript
// Option A example (conservative):
if (fruit !== null && !prev.noteMode) {
  const newGrid = prev.grid.map((r) =>
    r.map((c) => {
      const isInSameRow = c.row === row;
      const isInSameCol = c.col === col;
      const isInSameBox =
        Math.floor(c.row / 3) === Math.floor(row / 3) &&
        Math.floor(c.col / 3) === Math.floor(col / 3);

      const shouldClearNote = isInSameRow || isInSameCol || isInSameBox;

      return {
        ...c,
        notes: shouldClearNote ? c.notes.filter((n) => n !== fruit) : c.notes,
      };
    }),
  );
}
```

### Task 2.4 - Add Notes toggle button to FruitPicker

**File:** `src/components/game/FruitPicker.tsx` (or other location)

**USER DECISION REQUIRED**: Toggle button placement and style

```typescript
interface FruitPickerProps {
  onFruitClick: (fruit: number | null) => void;
  disabled: boolean;
  fruits: string[];
  noteMode: boolean; // NEW
  onToggleNoteMode: () => void; // NEW
}
```

Add button (example - pencil/writing icon):

```typescript
<button
  type="button"
  onClick={onToggleNoteMode}
  className={`w-10 h-10 rounded-full transition-transform ${
    noteMode
      ? "bg-blue-500 text-white ring-2 ring-blue-300"
      : "bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-600"
  }`}
  aria-label="โน้ตเขียนตัวเลข"
  title="โน้ตเขียนตัวเลข"
>
  <Pencil className="w-5 h-5" />
</button>
```

### Task 2.5 - Update Cell component to render notes

**File:** `src/components/sudoku/Cell.tsx`

**USER DECISION REQUIRED**: Notes rendering style

Add notes rendering logic:

```typescript
export function Cell({
  cell,
  // ... existing props
}: CellProps) {
  // ... existing code

  // Render notes if cell is empty and has notes
  const renderNotes = () => {
    if (cell.value !== null || cell.notes.length === 0) return null;

    return (
      <div className="grid grid-cols-3 grid-rows-3 w-full h-full">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((noteIndex) => (
          <div
            key={noteIndex}
            className="flex items-center justify-center text-xs"
          >
            {cell.notes.includes(noteIndex) ? fruits[noteIndex] : ""}
          </div>
        ))}
      </div>
    );
  };

  return (
    <button
      // ... existing props
      className={`... ${cell.notes.length > 0 ? "text-sm" : ""}`}
    >
      {cell.value !== null ? fruits[cell.value] : renderNotes()}
    </button>
  );
}
```

---

## ✅ Step 3: Verification (Test & Deploy)

### Task 3.1 - Test functionality

- [ ] Toggle note mode → button shows active state
- [ ] In note mode, click fruit → note appears in cell (3x3 mini grid)
- [ ] Click same fruit again → note is removed (toggle behavior)
- [ ] Switch to normal mode → fruit is placed, notes are cleared
- [ ] Notes survive undo/redo
- [ ] Smart note clearing: when placing fruit, notes removed from related cells
- [ ] Initial cells cannot have notes (should be disabled)
- [ ] Test with various screen sizes (notes are small)
- [ ] Run `bun run lint` to verify Biome compliance

---

## Done Criteria

Players can:
1. Toggle note mode via button in FruitPicker
2. Add/remove pencil marks (notes) in cells using 3x3 mini grid
3. Place fruits normally when note mode is off
4. Notes auto-clear when cell is filled
5. Smart clearing removes placed fruit from related cells' notes

---

## User Decisions Required

### 1. Notes Toggle Button Placement

**Option A**: In FruitPicker (before or after the clear button)
**Option B**: In GameInfoBar (next to undo/redo)
**Option C**: Floating button near the grid

### 2. Notes Rendering Style

**Option A**: 3x3 mini grid (standard Sudoku app style)
**Option B**: List/circle of small emojis in corners
**Option C**: Simple text list (1 3 5)

### 3. Smart Note Clearing

**Option A**: Conservative - Clear from row/col/box only
**Option B**: Aggressive - Clear from entire board
**Option C**: None - Manual only

---

## Files to Modify

| File | Action |
|------|--------|
| `src/lib/types.ts` | Add notes to Cell, noteMode to GameState |
| `src/hooks/useGameState.ts` | Note mode logic, smart clearing |
| `src/components/game/FruitPicker.tsx` | Add toggle button |
| `src/components/sudoku/Cell.tsx` | Render notes in 3x3 grid |
| `src/app/page.tsx` | Pass note mode props |
