# Roadmap

## Phase 1: Core Game Logic
- [x] Sudoku puzzle generation algorithm
- [x] Puzzle validator (check if solution is valid)
- [x] Difficulty level handler (cells to remove)

## Phase 2: Foundation
- [x] Type definitions (Cell, Grid, GameState) - done in Phase 1
- [x] Game state management (useState in page.tsx)
- [x] Timer logic (useEffect with setInterval)

## Phase 3: Components
- [x] Cell component (src/components/Cell.tsx)
- [x] Board component (src/components/Board.tsx - 3x3 box with 9 cells)
- [x] SudokuGrid component (src/components/SudokuGrid.tsx - organizes grid into 3x3 boxes)
- [x] FruitPicker component (src/components/FruitPicker.tsx - 9 fruit buttons)
- [x] GameControls component (src/components/GameControls.tsx - difficulty, new game, timer)

## Phase 4: Integration
- [x] Main game page assembly (page.tsx)
- [x] Connect components to state
- [x] Click cell → select fruit flow

## Phase 5: Polish
- [x] Styling (Tailwind)
- [x] Visual feedback (selected cell, win state)
- [x] Responsive design
- [x] Accessibility (aria-labels on buttons)
