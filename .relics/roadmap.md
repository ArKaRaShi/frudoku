# Frudoku Roadmap

## Completed (Phases 1-10)

### Phase 1: Core Game Logic
- [x] Sudoku puzzle generation algorithm
- [x] Puzzle validator (check if solution is valid)
- [x] Difficulty level handler (cells to remove)

### Phase 2: Foundation
- [x] Type definitions (Cell, Grid, GameState) - done in Phase 1
- [x] Game state management (useState in page.tsx)
- [x] Timer logic (useEffect with setInterval)

### Phase 3: Components
- [x] Cell component (src/components/Cell.tsx)
- [x] Board component (src/components/Board.tsx - 3x3 box with 9 cells)
- [x] SudokuGrid component (src/components/SudokuGrid.tsx - organizes grid into 3x3 boxes)
- [x] FruitPicker component (src/components/FruitPicker.tsx - 9 fruit buttons)
- [x] GameControls component (src/components/GameControls.tsx - difficulty, new game, timer)

### Phase 4: Integration
- [x] Main game page assembly (page.tsx)
- [x] Connect components to state
- [x] Click cell → select fruit flow

### Phase 5: Polish
- [x] Styling (Tailwind)
- [x] Visual feedback (selected cell, win state)
- [x] Responsive design
- [x] Accessibility (aria-labels on buttons)

### Phase 6: Landing Page
- [x] Landing page component with title and description
- [x] Difficulty selector on landing page
- [x] Start button to begin game
- [x] Game flow: Landing → Game → Win (with Play Again)

### Phase 7: Thai Localization
- [x] Translate all UI text to Thai
- [x] Landing page (ซูโดกุผลไม้, เริ่มเกม, etc.)
- [x] Game controls (เกมใหม่, เมนู)
- [x] Win screen (คุณชนะแล้ว!, เล่นอีกครั้ง, หน้าหลัก)
- [x] Difficulty labels (ง่าย, ปานกลาง, ยาก)

### Phase 8: Auto-Check / Highlight Conflicts
- [x] Toggle button for highlight mode (แสดงผลไม้ชนกัน)
- [x] Detect conflicts in row, column, and 3x3 box
- [x] Highlight ALL conflicting cells (including pre-filled) in red
- [x] Permanent highlighting until error is fixed
- [x] Update Cell component to show error state
- [x] Update game state to track conflicts
- [x] Clear/erase button (ลบผลไม้) - X icon in fruit picker to clear cell

### Phase 9: Fruit Themes & Customization
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

### Phase 10: Dark/Light Mode (Appearance Theme)
- [x] Theme toggle button (sun/moon icon) - placed next to hamburger menu
- [x] System preference detection (via next-themes)
- [x] Local storage for theme persistence (via next-themes)
- [x] Smooth transition between themes (via CSS transitions)
- [x] Update all Tailwind dark: classes to work properly

**Implementation:** Used `next-themes` library for robust theme handling with SSR support. Theme toggle buttons added to all screens (landing, playing, won). Layout: ระดับความยาก | เวลา: 00:00 [🌙/☀️] [≡ เมนู]

---

## Upcoming Phases

### Phase 11: Essential Gameplay UX (🔴 High Priority)

**Goal:** Add core quality-of-life features that significantly improve the daily playing experience.

#### 11.1 Undo/Redo System
**Complexity:** Medium | **Why:** Players make mistakes; this is expected behavior for Sudoku apps.

- [x] Add `history` stack to GameState (array of past grid states)
- [x] Add `historyIndex` to track current position
- [x] Implement `undo()` and `redo()` callbacks in useGameState
- [x] Add Undo/Redo buttons in GameInfoBar
- [x] Disable buttons when no history available
- [x] Limit history depth to last 50 moves (MAX_HISTORY_DEPTH)
- [ ] Add keyboard shortcuts (Ctrl+Z / Cmd+Z for undo) - **Deferred**

**Dependencies:** None | **Risks:** Memory usage if unlimited history; implement depth limit

**Implementation Notes:**
- UndoRedoControls component placed in GameInfoBar with 2-layer layout
- History tracks cell values only; timer unaffected by undo/redo
- Buttons properly disable when no history available
- Lint checks pass

#### 11.2 Notes/Pencil Marks Mode
**Complexity:** Medium | **Why:** Essential for harder puzzles; players need to track candidates.

- [ ] Extend Cell type to support `notes: number[]` (array of fruit indices)
- [ ] Add `noteMode: boolean` to GameState
- [ ] Add Notes toggle button in FruitPicker
- [ ] Update Cell component to render small note emojis
- [ ] Handle note mode in handleFruitClick (toggle in notes vs place fruit)
- [ ] Auto-clear notes when cell is filled with actual fruit
- [ ] Smart note clearing: remove notes from row/col/box when fruit placed

**Dependencies:** Cell type update, grid state management | **Risks:** UI complexity with small emoji rendering

#### 11.3 Keyboard Navigation
**Complexity:** Low | **Why:** Desktop users expect keyboard support; accessibility requirement.

- [ ] Add global keyboard event listener to page.tsx
- [ ] Arrow keys: navigate between cells
- [ ] Number keys 1-9: place fruit directly (if cell selected)
- [ ] Delete/Backspace: clear cell
- [ ] N key: toggle note mode
- [ ] U key: undo
- [ ] Escape: deselect cell
- [ ] Prevent default behavior for bound keys
- [ ] Add keyboard hint text in settings or tutorial

**Dependencies:** None | **Risks:** Ensure doesn't break on mobile (keyboard only active on desktop)

#### 11.4 Smart Cell Highlighting
**Complexity:** Low | **Why:** Visual clarity - helps players see relationships.

- [x] Highlight selected cell's row, column, and 3x3 box
- [x] Highlight all cells with same fruit when one is selected
- [x] Use subtle background colors (zinc-100 for related cells, amber-100 for same fruit)
- [x] Add CSS classes for `related-row`, `related-col`, `related-box`, `same-fruit`
- [x] Ensure doesn't conflict with conflict highlighting

**Dependencies:** None | **Exit Criteria:** Player can easily see cell relationships when selecting

**Implementation Notes:**
- Added highlight props to Cell component: `isRelatedRow`, `isRelatedCol`, `isRelatedBox`, `isSameFruit`
- Board component calculates these states using helper functions
- Priority: Conflict > Initial > Selected > Same fruit > Related > Normal
- Lint checks pass

---

### Phase 12: Engagement Features (🟡 Medium Priority)

**Goal:** Increase player retention with progress tracking and daily engagement.

#### 12.1 Game Statistics Dashboard
**Complexity:** Medium | **Why:** Players love seeing their progress; motivates continued play.

- [ ] Define Stats type: games played, win rate, best times, streaks
- [ ] Create src/lib/stats.ts for stats management
- [ ] Update localStorage on game completion
- [ ] Create StatsScreen component
- [ ] Add to GameMenu dropdown
- [ ] Display: total games, win % by difficulty, best times, winning streak, total fruits placed
- [ ] Add "Reset Stats" button

**Dependencies:** localStorage, new screen component

#### 12.2 Hint System
**Complexity:** Medium | **Why:** Helps stuck players; reduces frustration.

- [ ] Implement `getHint(grid)` function in sudoku.ts (find naked singles)
- [ ] Add Hint button in GameMenu
- [ ] Limit hints per game (e.g., 3 hints) or add time penalty
- [ ] Visual feedback: flash hinted cell briefly
- [ ] Track hints used in stats
- [ ] Add cooldown (optional)

**Dependencies:** Sudoku solver logic | **Risks:** Don't make hints too powerful; maintain challenge

#### 12.3 Victory Celebrations
**Complexity:** Low | **Why:** Emotional payoff; makes winning feel rewarding.

- [ ] Add confetti animation on win
- [ ] Use canvas-confetti or similar library
- [ ] Show detailed stats breakdown on WinScreen
- [ ] Add fruit emoji rain animation
- [ ] Different celebrations for milestones (fast win, no hints, perfect game)
- [ ] Shareable victory card (image or text summary)

**Dependencies:** WinScreen component, confetti library

#### 12.4 Progress Indicators
**Complexity:** Low | **Why:** Players want to see how close they are to completion.

- [ ] Add progress bar to GameInfoBar
- [ ] Show completion percentage
- [ ] Show fruit counts (e.g., 🍎 5/9, 🍊 3/9)
- [ ] Highlight when a fruit is complete (all 9 placed)
- [ ] Celebrate milestones (25%, 50%, 75% complete)

---

### Phase 13: Challenge Mode (🟡 Medium Priority)

**Goal:** Add a challenging mode for experienced players.

#### 13.1 Mistake Limit Mode
**Complexity:** Medium | **Why:** Adds stakes; popular in mobile Sudoku apps.

- [ ] Add `mistakeLimit: number` to GameState (default: null for casual)
- [ ] Add `mistakesMade: number` tracker
- [ ] Add Challenge Mode toggle on landing page
- [ ] Detect conflicts as mistakes (increment counter when conflict created)
- [ ] Display lives as hearts (❤️❤️❤️)
- [ ] Game over screen when 3 mistakes reached
- [ ] Track mistake-free wins in stats
- [ ] Add "Challenge Mode" badge to wins

**Dependencies:** Conflict detection system already in place

---

### Phase 14: Daily Challenges (🔴 High Priority)

**Goal:** Drive daily engagement with seeded puzzles.

#### 14.1 Daily Challenge System
**Complexity:** Medium | **Why:** Proven retention mechanic; creates habit.

- [ ] Create `generateDailyPuzzle(date: Date)` in sudoku.ts
- [ ] Use date as seed for puzzle generation
- [ ] Store daily completion status in localStorage
- [ ] Add Daily Challenge button on LandingPage
- [ ] Show streak (e.g., "Day 5 🔥")
- [ ] Calendar view of past participation
- [ ] Special badge for streaks (7, 30, 100 days)
- [ ] Countdown to next daily puzzle

**Dependencies:** Seeded random number generator, date-based seeding

---

### Phase 15: Polish & Animations (🟢 Low Priority)

**Goal:** Make the app feel polished and delightful.

#### 15.1 Fruit Animations
- [ ] Pop animation when fruit placed
- [ ] Shake animation for conflicts
- [ ] Bounce animation for completed rows/boxes
- [ ] Victory fruit explosion

#### 15.2 Smooth Transitions
- [ ] Screen transition animations
- [ ] Cell selection fade
- [ ] Theme switch transitions (already partially done)

#### 15.3 Sound Effects (Optional)
- [ ] Click sounds for selection
- [ ] Success sound for placement
- [ ] Error buzz for conflicts
- [ ] Victory fanfare
- [ ] Mute toggle in settings

---

### Phase 16: Advanced Features (🟢 Low Priority)

**Goal:** Add depth for power users.

#### 16.1 Additional Fruit Themes
- [ ] Add Berries theme
- [ ] Add Dessert theme
- [ ] Add Seasonal themes (auto-switch by month)

#### 16.2 Expert Difficulty
- [ ] Add "expert" level (65-70 cells removed)
- [ ] Update difficulty labels
- [ ] Ensure puzzles remain solvable

#### 16.3 Number Mode Toggle
- [ ] Add option to switch between fruits and numbers
- [ ] Per-game setting or global preference

#### 16.4 Auto-Fill Candidates
- [ ] Show all valid fruits for empty cells
- [ ] Toggle on/off in settings
- [ ] Different visual style from manual notes

---

### Phase 17: Technical Enhancements (🟡 Medium Priority)

**Goal:** Improve app reliability and performance.

#### 17.1 PWA Support
**Complexity:** Medium | **Why:** Allows install on mobile; offline play.

- [ ] Add next-pwa or similar
- [ ] Configure manifest.json
- [ ] Add app icons (multiple sizes)
- [ ] Configure service worker for offline
- [ ] Add offline fallback UI
- [ ] Test on mobile devices

#### 17.2 Game State Persistence
**Complexity:** Medium | **Why:** Players hate losing progress when accidentally closing.

- [ ] Auto-save game state to localStorage every move
- [ ] Restore on app load
- [ ] Show "Resume Game" on landing if interrupted
- [ ] Clear save after completion or new game start

#### 17.3 Performance Optimizations
- [ ] Memoize expensive calculations
- [ ] Optimize re-renders with React.memo
- [ ] Pre-generate puzzles if needed

---

### Phase 18: Accessibility Improvements (🔴 High Priority)

**Goal:** Ensure the game is playable by everyone.

#### 18.1 Enhanced Screen Reader Support
**Complexity:** Medium

- [ ] Add aria-labels to all interactive elements
- [ ] Live region announcements for game events
- [ ] Cell coordinates in aria labels (e.g., "Row 1, Column 3, Apple")
- [ ] Fruit names announced (not just emoji)

#### 18.2 High Contrast Mode
- [ ] Add high contrast theme option
- [ ] Beyond dark mode: maximum contrast
- [ ] Larger text option

#### 18.3 Color Blind Friendly Mode
- [ ] Add patterns/symbols alongside colors
- [ ] Alternative conflict indicators (not just red)

---

### Phase 19: Learning Features (🟡 Medium Priority)

**Goal:** Help new players learn Sudoku.

#### 19.1 Interactive Tutorial
**Complexity:** High

- [ ] First-time user onboarding flow
- [ ] How to play instructions (in Thai)
- [ ] Basic rules explanation
- [ ] Interactive practice grid
- [ ] Skip option for experienced players

#### 19.2 Sudoku Techniques Guide
**Complexity:** Medium

- [ ] In-app guide for basic techniques
- [ ] Visual examples with fruits
- [ ] Step-by-step explanations

---

### Phase 20: Future Enhancements (🟢 Low Priority)

#### 20.1 Multiplayer (Async)
- Send puzzle challenges to friends
- "Beat my time" challenges
- Puzzle sharing via link/QR code

#### 20.2 Global Leaderboards
- Daily/weekly/all-time rankings
- Separate by difficulty
- Anonymous or with usernames

#### 20.3 Mini Sudoku (6x6)
- Smaller grid for quick games
- Great for beginners

#### 20.4 Achievement System
- Badges for milestones
- First Win, Speed Demon, Perfect Game, etc.

---

## Implementation Priority Summary

### 🚀 Immediate Next Steps (Phase 11)
Highest-impact features:

1. **Undo/Redo** - Most requested feature for Sudoku apps
2. **Notes Mode** - Essential for harder puzzles
3. **Keyboard Support** - Desktop accessibility and UX
4. **Smart Highlighting** - Quick win for visual clarity

### 📊 Short-term (Phases 12-14)
Focus on engagement and retention:

5. Statistics Dashboard
6. Daily Challenges
7. Hint System
8. Victory Celebrations

### ✨ Medium-term (Phases 15-17)
Polish and technical improvements:

9. Animations and transitions
10. PWA support
11. Game state persistence
12. Accessibility enhancements

### 🎯 Long-term (Phases 18-20)
Advanced features for depth:

13. Tutorial and guides
14. Challenge mode
15. Multiplayer and leaderboards
