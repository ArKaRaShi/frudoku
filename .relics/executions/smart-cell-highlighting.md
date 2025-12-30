# 📋 Execution Plan: Smart Cell Highlighting

**Reference:** PHASE 11, Feature 11.4

**User Decisions:**

-   **Highlight types:** Row, column, 3x3 box, and same fruit
-   **Color scheme:** Zinc-100 (subtle) for related cells
-   **Priority:** Conflict > Selected > Same fruit > Related row/col/box > Normal

---

## 🛠️ Step 1: Foundation (Data & Logic)

### Task 1.1 - Extend Cell props interface

**File:** `src/components/sudoku/Cell.tsx`

Add new props to `CellProps` interface:

```typescript
interface CellProps {
	cell: CellType;
	isSelected: boolean;
	hasConflict: boolean;
	isRelatedRow: boolean; // NEW
	isRelatedCol: boolean; // NEW
	isRelatedBox: boolean; // NEW
	isSameFruit: boolean; // NEW
	onClick: () => void;
	disabled: boolean;
	fruits: string[];
}
```

### Task 1.2 - Update Board to calculate highlight states

**File:** `src/components/sudoku/Board.tsx`

Add helper function to calculate highlight states:

```typescript
// Helper to check if cell is in same 3x3 box as selected cell
function isInSameBox(
	cellRow: number,
	cellCol: number,
	selectedRow: number,
	selectedCol: number
): boolean {
	const boxRow = Math.floor(cellRow / 3);
	const boxCol = Math.floor(cellCol / 3);
	const selectedBoxRow = Math.floor(selectedRow / 3);
	const selectedBoxCol = Math.floor(selectedCol / 3);
	return boxRow === selectedBoxRow && boxCol === selectedBoxCol;
}
```

Update cell mapping to calculate new props:

```typescript
const selectedValue = selectedCell
	? cells[(selectedCell.row / 3) | 0]?.[(selectedCell.col / 3) | 0]?.[
			selectedCell.row % 3
	  ]?.[selectedCell.col % 3]?.value
	: null;

// Inside the map:
const isRelatedRow = selectedCell?.row === cell.row;
const isRelatedCol = selectedCell?.col === cell.col;
const isRelatedBox = selectedCell
	? isInSameBox(cell.row, cell.col, selectedCell.row, selectedCell.col)
	: false;
const isSameFruit = selectedValue !== null && cell.value === selectedValue;
```

---

## 💻 Step 2: Implementation (UI & Styling)

### Task 2.1 - Update Cell component with new highlight classes

**File:** `src/components/sudoku/Cell.tsx`

Update the component to accept new props and apply styles:

```typescript
export function Cell({
	cell,
	isSelected,
	hasConflict,
	isRelatedRow,
	isRelatedCol,
	isRelatedBox,
	isSameFruit,
	onClick,
	disabled,
	fruits,
}: CellProps) {
	const isBoxRight = cell.col % 3 === 2 && cell.col < 8;
	const isBoxBottom = cell.row % 3 === 2 && cell.row < 8;

	// Calculate background class based on priority
	const getBackgroundClass = () => {
		if (hasConflict) return "bg-red-200 dark:bg-red-900";
		if (cell.initial) return "bg-zinc-300 dark:bg-zinc-600 font-bold";
		if (isSelected) return "bg-yellow-200 dark:bg-yellow-800";
		if (isSameFruit) return "bg-amber-100 dark:bg-amber-900/40";
		if (isRelatedRow || isRelatedCol || isRelatedBox)
			return "bg-zinc-100 dark:bg-zinc-700/50";
		return "bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700";
	};

	return (
		<button
			type="button"
			onClick={onClick}
			className={`w-full aspect-square flex items-center justify-center text-xl sm:text-2xl md:text-3xl transition-colors ${getBackgroundClass()} ${
				isBoxRight ? "border-r-2 border-black dark:border-zinc-500" : ""
			} ${
				isBoxBottom
					? "border-b-2 border-black dark:border-zinc-500"
					: ""
			}`}
			disabled={disabled || cell.initial}
			aria-label={`Cell ${cell.row + 1}, ${cell.col + 1}${
				cell.value !== null
					? ` containing ${fruits[cell.value]}`
					: " empty"
			}${hasConflict ? " (conflict)" : ""}`}
		>
			{cell.value !== null ? fruits[cell.value] : ""}
		</button>
	);
}
```

**Note:** Added `getBackgroundClass()` function for clean priority-based class selection.

---

## ✅ Step 3: Verification (Test & Deploy)

### Task 3.1 - Test functionality

-   [ ] Click cell → verify row, column, and 3x3 box are highlighted in zinc-100
-   [ ] Click cell with value → verify all cells with same fruit are highlighted in amber-100
-   [ ] Verify selected cell (yellow-200) takes priority over related highlights
-   [ ] Verify conflict highlighting (red-200) takes highest priority
-   [ ] Verify initial cells (zinc-300) are not affected by related highlighting
-   [ ] Verify hover states still work on non-highlighted cells
-   [ ] Test in dark mode to verify dark: classes work correctly
-   [ ] Run `bun run lint` to verify Biome compliance

---

## Done Criteria

When a cell is selected, players can easily see:

1. The entire row (subtle zinc-100 highlight)
2. The entire column (subtle zinc-100 highlight)
3. The entire 3x3 box (subtle zinc-100 highlight)
4. All cells with the same fruit value (amber-100 highlight)
5. Conflict highlighting still takes precedence over all highlights

---

## CSS Classes Reference

| Class Name                          | Usage               | Color (Light) | Color (Dark)        |
| ----------------------------------- | ------------------- | ------------- | ------------------- |
| `bg-red-200 dark:bg-red-900`        | Conflict            | Red           | Red                 |
| `bg-yellow-200 dark:bg-yellow-800`  | Selected            | Yellow        | Yellow              |
| `bg-amber-100 dark:bg-amber-900/40` | Same fruit          | Amber         | Amber (transparent) |
| `bg-zinc-100 dark:bg-zinc-700/50`   | Related row/col/box | Zinc-100      | Zinc (transparent)  |
| `bg-zinc-300 dark:bg-zinc-600`      | Initial cell        | Zinc-300      | Zinc-600            |
| `bg-white dark:bg-zinc-800`         | Normal              | White         | Zinc-800            |

---

## Priority Order (highest to lowest)

1. **Conflict** (red-200) - Always visible regardless of other states
2. **Initial cell** (zinc-300) - Pre-filled cells have fixed background
3. **Selected** (yellow-200) - Currently selected cell
4. **Same fruit** (amber-100) - Cells matching selected cell's value
5. **Related** (zinc-100) - Row, column, or box of selected cell
6. **Normal** (white) - Default cell state

---

## Files to Modify

| File                              | Action                                   |
| --------------------------------- | ---------------------------------------- |
| `src/components/sudoku/Cell.tsx`  | Add new props, update background logic   |
| `src/components/sudoku/Board.tsx` | Calculate highlight states, pass to Cell |
