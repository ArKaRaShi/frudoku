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

## Phase 6: Landing Page
- [x] Landing page component with title and description
- [x] Difficulty selector on landing page
- [x] Start button to begin game
- [x] Game flow: Landing → Game → Win (with Play Again)

## Phase 7: Thai Localization
- [x] Translate all UI text to Thai
- [x] Landing page (ซูโดกุผลไม้, เริ่มเกม, etc.)
- [x] Game controls (เกมใหม่, เมนู)
- [x] Win screen (คุณชนะแล้ว!, เล่นอีกครั้ง, หน้าหลัก)
- [x] Difficulty labels (ง่าย, ปานกลาง, ยาก)

## Phase 8: Auto-Check / Highlight Conflicts
- [x] Toggle button for highlight mode (แสดงผลไม้ชนกัน)
- [x] Detect conflicts in row, column, and 3x3 box
- [x] Highlight ALL conflicting cells (including pre-filled) in red
- [x] Permanent highlighting until error is fixed
- [x] Update Cell component to show error state
- [x] Update game state to track conflicts
- [x] Clear/erase button (ลบผลไม้) - X icon in fruit picker to clear cell

## Phase 9: Fruit Themes & Customization
- [x] Theme definitions (Default, Tropical, Custom)
- [x] Theme selector in settings modal
- [x] Custom fruit picker - 9 emoji input fields with emoji grid
- [x] Local storage to save selected theme/custom fruits
- [x] Update fruits.ts to support dynamic fruit sets
- [x] Settings button on landing page
- [x] Update all components to use dynamic fruits (Cell, Board, SudokuGrid, FruitPicker)

**Themes:**
- Default: 🍎 🍊 🍋 🍇 🍓 🍑 🥝 🍒 🍍
- Tropical: 🥥 🥭 🍌 🍍 🥝 🍉 🍈 🥑 🍅

## Phase 10: Dark/Light Mode (Appearance Theme)
- [x] Theme toggle button (sun/moon icon) - placed next to hamburger menu
- [x] System preference detection (via next-themes)
- [x] Local storage for theme persistence (via next-themes)
- [x] Smooth transition between themes (via CSS transitions)
- [x] Update all Tailwind dark: classes to work properly

**Implementation:** Used `next-themes` library for robust theme handling with SSR support. Theme toggle buttons added to all screens (landing, playing, won). Layout: ระดับความยาก | เวลา: 00:00 [🌙/☀️] [≡ เมนู]
