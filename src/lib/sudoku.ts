import type { Difficulty, Grid } from "./types";

// Number of cells to remove for each difficulty level
export const DIFFICULTY_HOLES: Record<Difficulty, number> = {
  easy: 21,
  medium: 41,
  hard: 61,
};

/**
 * Check if placing a value at the given position is valid according to Sudoku rules
 */
export function isValidMove(
  grid: Grid,
  row: number,
  col: number,
  value: number,
): boolean {
  // Check row
  for (let c = 0; c < 9; c++) {
    if (c !== col && grid[row][c].value === value) {
      return false;
    }
  }

  // Check column
  for (let r = 0; r < 9; r++) {
    if (r !== row && grid[r][col].value === value) {
      return false;
    }
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if ((r !== row || c !== col) && grid[r][c].value === value) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Get all cells that have conflicts with other cells
 * Returns a Set of "row-col" strings for conflicting cells
 */
export function getConflictingCells(grid: Grid): Set<string> {
  const conflicts = new Set<string>();

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = grid[row][col];
      if (cell.value === null) continue;

      // Check row for duplicates
      for (let c = 0; c < 9; c++) {
        if (c !== col && grid[row][c].value === cell.value) {
          conflicts.add(`${row}-${col}`);
          conflicts.add(`${row}-${c}`);
        }
      }

      // Check column for duplicates
      for (let r = 0; r < 9; r++) {
        if (r !== row && grid[r][col].value === cell.value) {
          conflicts.add(`${row}-${col}`);
          conflicts.add(`${r}-${col}`);
        }
      }

      // Check 3x3 box for duplicates
      const boxRow = Math.floor(row / 3) * 3;
      const boxCol = Math.floor(col / 3) * 3;
      for (let r = boxRow; r < boxRow + 3; r++) {
        for (let c = boxCol; c < boxCol + 3; c++) {
          if ((r !== row || c !== col) && grid[r][c].value === cell.value) {
            conflicts.add(`${row}-${col}`);
            conflicts.add(`${r}-${c}`);
          }
        }
      }
    }
  }

  return conflicts;
}

/**
 * Check if the grid is completely filled and valid
 */
export function isSolved(grid: Grid): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = grid[row][col];
      // Must be filled
      if (cell.value === null) {
        return false;
      }
      // Must be valid
      if (!isValidMove(grid, row, col, cell.value)) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Create an empty 9x9 grid
 */
function createEmptyGrid(): Grid {
  const grid: Grid = [];
  for (let row = 0; row < 9; row++) {
    grid[row] = [];
    for (let col = 0; col < 9; col++) {
      grid[row][col] = {
        value: null,
        initial: false,
        row,
        col,
      };
    }
  }
  return grid;
}

/**
 * Fill the diagonal 3x3 boxes first (independent of each other)
 * This improves randomness for puzzle generation
 */
function fillDiagonalBoxes(grid: Grid): void {
  for (let box = 0; box < 9; box += 3) {
    const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    shuffleArray(nums);
    let idx = 0;
    const startRow = box;
    const startCol = box;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        grid[startRow + r][startCol + c].value = nums[idx++] as
          | 0
          | 1
          | 2
          | 3
          | 4
          | 5
          | 6
          | 7
          | 8;
      }
    }
  }
}

/**
 * Fisher-Yates shuffle
 */
function shuffleArray<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * Solve the puzzle using backtracking
 * Returns true if solvable, false otherwise
 */
function solve(grid: Grid): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col].value === null) {
        // Try values 0-8 in random order for variety
        const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        shuffleArray(nums);

        for (const num of nums) {
          if (isValidMove(grid, row, col, num)) {
            grid[row][col].value = num as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
            if (solve(grid)) {
              return true;
            }
            grid[row][col].value = null;
          }
        }
        return false;
      }
    }
  }
  return true;
}

/**
 * Remove cells from the grid based on difficulty
 */
function removeCells(grid: Grid, difficulty: Difficulty): void {
  const cellsToRemove = DIFFICULTY_HOLES[difficulty];
  const cells: { row: number; col: number }[] = [];

  // Get all cell positions
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      cells.push({ row, col });
    }
  }

  // Shuffle and pick cells to remove
  shuffleArray(cells);
  for (let i = 0; i < cellsToRemove && i < cells.length; i++) {
    const { row, col } = cells[i];
    grid[row][col].value = null;
    grid[row][col].initial = false;
  }

  // Mark remaining cells as initial
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col].value !== null) {
        grid[row][col].initial = true;
      }
    }
  }
}

/**
 * Deep clone a grid
 */
function cloneGrid(grid: Grid): Grid {
  return grid.map((row) =>
    row.map((cell) => ({
      ...cell,
    })),
  );
}

/**
 * Generate a new Sudoku puzzle
 * Returns a playable grid with some cells removed based on difficulty
 */
export function generatePuzzle(difficulty: Difficulty = "medium"): Grid {
  // Create empty grid
  const grid = createEmptyGrid();

  // Fill diagonal boxes first (independent)
  fillDiagonalBoxes(grid);

  // Solve to fill the rest
  solve(grid);

  // Clone the solved grid
  const puzzle = cloneGrid(grid);

  // Remove cells based on difficulty
  removeCells(puzzle, difficulty);

  return puzzle;
}
