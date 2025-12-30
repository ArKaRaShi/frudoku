# Future Features

> **Note**: Some features listed below are already implemented but not yet marked complete in roadmap.md.
> - ✅ Custom Fruits - Fully implemented with 23 emojis
> - ✅ Theme Selection - Default and Tropical themes available
> - ✅ Auto-Check - Conflict detection with toggle button

---

## Priority Legend
- 🔴 **High Priority** - Core features that significantly improve UX
- 🟡 **Medium Priority** - Nice-to-have features for engagement
- 🟢 **Low Priority** - Polish and niche features

---

## Gameplay Enhancements

### 🔴 Notes/Pencil Marks
- Toggle between normal and note mode
- Add small fruit notes in cells (2-9 small fruits)
- Auto-clear notes when cell is filled
- Smart note clearing: remove notes from row/column/box when fruit is placed
- Notes button in fruit picker area

### 🔴 Undo/Redo System
- Move history stack with unlimited undo
- Keyboard shortcuts (Ctrl+Z, Ctrl+Y / Cmd+Z, Cmd+Y)
- Visual indicator when history is available
- Preserve history across game sessions

### 🔴 Keyboard Navigation
- Arrow keys for cell navigation
- Number keys (1-9) for quick fruit input
- Delete/Backspace to clear cell
- N to toggle note mode
- H for hint, U for undo
- Escape to deselect

### 🟡 Hint System
- Reveal one correct cell (with cooldown or limited uses)
- Highlight all instances of a selected fruit
- "Smart hint" - explains logic for the suggested move
- Hint cost system (time penalty or limited hints per game)

### 🟡 Mistake Limit Mode (Challenge Mode)
- 3-strike system with visual hearts/lives
- Game over after 3 mistakes
- Optional toggle for casual play
- Achievement tracking for mistake-free wins

### 🟡 Smart Cell Highlighting
- Highlight related cells (same row, column, box) when cell selected
- Highlight all same fruits when one is selected
- Visual lines showing cell relationships

### 🟢 Auto-Fill Candidates
- Show all possible fruits for empty cells
- Automatically update candidates as cells fill
- Different visual style from manual notes

### 🟢 Progress Indicators
- Show how many of each fruit are placed (1/9, 2/9, etc.)
- Highlight rows/boxes with single empty cell
- Progress bar for completion percentage
- Celebration at milestones (25%, 50%, 75%)

---

## Customization & Themes

### 🟡 Number Mode Toggle
- Switch between fruits and classic numbers (1-9)
- Per-game setting or global preference

### 🟡 Additional Fruit Themes
- **Berries**: 🍓 🫐 🍒 🍇 🍈 🍉 🥝 🍍 🥥
- **Citrus**: 🍊 🍋 🍋 🍅 🥕 🌶️ 🫑 🥒 🥬
- **Exotic**: 🥭 🍍 🥥 🍆 🥑 🫒 🍈 🍉 🫐
- **Dessert**: 🍰 🧁 🍩 🍪 🎂 🍮 🍬 🍭 🍫
- **Seasonal**: Spring, Summer, Autumn, Winter rotations

### 🟡 Board Color Themes
- Multiple color schemes (Nature, Ocean, Sunset, Cherry Blossom)
- Custom board background colors
- Custom conflict color (not just red)
- Custom cell border colors

### 🟢 Fruit Animations
- Pop animation when fruit is placed
- Shake animation for conflicts
- Bounce animation for completed rows/boxes
- Victory fruit explosion/congratulations

### 🟢 Sound Effects (Optional)
- Click sounds for cell selection
- Success sound for fruit placement
- Error buzz for conflicts
- Victory fanfare
- Toggle to disable all sounds

### 🟢 Background Themes
- Nature backgrounds (orchard, garden)
- Abstract patterns
- Solid colors with gradients
- Upload custom background

---

## Progress & Statistics

### 🔴 Game Statistics Dashboard
- Total games played
- Win percentage by difficulty
- Best times for each difficulty
- Average solve time
- Current and longest winning streak
- Total fruits placed
- Games abandoned

### 🔴 Daily Challenges
- One puzzle per day (same for all users via seed)
- Streak tracking for daily completion
- Calendar view showing past participation
- Special badges for streaks (7, 30, 100 days)

### 🟡 Achievement System
- **First Win**: Complete your first puzzle
- **Speed Demon**: Complete easy in under 2 minutes
- **Perfect Game**: Win without any conflicts
- **Marathon**: Complete 10 puzzles in a row
- **Theme Master**: Win with all themes
- **Night Owl**: Complete a puzzle after midnight
- **Century**: Play 100 games
- **Custom Creator**: Create and win with custom fruits

### 🟡 Game History
- View past games with dates and times
- Replay feature (watch how you solved it)
- Export puzzles as share codes
- Import puzzles from share codes
- Favorite puzzles (save challenging ones)

### 🟢 Local Storage Persistence
- Auto-save current game state
- Resume interrupted games
- Multiple game save slots (3-5 slots)

---

## Difficulty & Puzzle Variations

### 🟡 Expert/Insane Difficulty
- Very hard: 65-70 cells removed
- Requires advanced techniques
- Symmetrical puzzles (visually balanced)

### 🟢 Mini Sudoku (6x6)
- Smaller grid for quick games
- 2x3 boxes instead of 3x3
- 6 fruits instead of 9
- Great for beginners or children

### 🟢 Diagonal Sudoku (X-Sudoku)
- Additional constraint: diagonals must contain all fruits
- Visual indicators for diagonal regions

### 🟢 Killer Sudoku
- Cages with sum constraints
- Visual cages with outlined regions

---

## Social & Multiplayer

### 🟡 Real-time Multiplayer Race
- Two players, same puzzle seed
- See opponent's progress bar
- Chat with fruit emoji reactions
- Friend matchmaking or random pairing
- Rematch option

### 🟡 Asynchronous Challenges
- Send a puzzle to a friend
- "Beat my time" challenges
- Puzzle sharing via QR code or link
- Challenge history

### 🟡 Global Leaderboards
- Daily/weekly/all-time leaderboards
- Separate by difficulty
- Anonymous or with usernames
- Country/regional rankings

### 🟢 Puzzle Exchange
- Community puzzle sharing
- Rate puzzles (easy/hard)
- Most popular puzzles

---

## Accessibility

### 🔴 Enhanced Screen Reader Support
- Aria labels for all interactive elements
- Live announcements for game events
- Audio cues for conflicts and wins

### 🟡 Color Blind Friendly Mode
- Patterns in addition to colors
- Symbols for conflict indicators
- Multiple color palette options

### 🟡 High Contrast Mode
- Beyond dark mode: maximum contrast option
- Larger text mode option

### 🟢 Motor Accessibility
- Larger touch targets option
- Alternative input methods

### 🟢 Language Support
- English localization
- Additional languages (Japanese, Chinese, etc.)
- Right-to-left support for Arabic/Hebrew

---

## Learning & Tutorials

### 🟡 Interactive Tutorial
- First-time user onboarding
- How to play instructions
- Basic Sudoku rules explanation
- Fruit substitution explanation
- Interactive practice grid

### 🟡 Sudoku Techniques Guide
- Basic techniques (scanning, single candidate)
- Intermediate techniques (pairs, triples)
- Advanced techniques (X-Wing, Swordfish)
- Visual examples with fruits
- Step-by-step explanations

### 🟢 Practice Mode
- Puzzles organized by technique
- Learn specific patterns
- Hints explain the technique
- Technique mastery tracking

---

## Visual & Audio Polish

### 🟡 Victory Celebrations
- Confetti animation
- Fruit rain animation
- Different celebrations for milestones
- Victory stats screen (detailed breakdown)
- Share victory image/card

### 🟢 Smooth Transitions
- Page transitions
- Cell selection animations
- Fruit placement animations
- Theme switch transitions
- Loading animations

### 🟢 Fruit Personalization
- Unlockable fruit skins
- Fruit variations (different apple styles)
- Seasonal themes (Christmas, Halloween)
- Animated fruit versions

---

## Mobile-Specific Features

### 🟡 Gesture Controls
- Swipe to navigate between cells
- Long press to enter note mode
- Double tap to place fruit
- Pinch to zoom grid
- Shake to undo

### 🟡 Haptic Feedback
- Vibrate on cell selection
- Different vibration for success/error
- Option to disable

### 🟢 Portrait/Landscape Optimization
- Landscape mode with side-by-side picker
- Tablet-optimized layouts
- Foldable phone support

### 🟢 Quick Actions Widget
- Home screen widget for daily challenge
- Quick start from widget
- Stats preview

---

## Technical Enhancements

### 🟡 PWA Support
- Install as app on mobile
- Offline gameplay
- App icon and splash screen
- Push notifications for daily challenges

### 🟢 Performance Optimizations
- Puzzle pre-generation
- Optimized re-renders
- Reduced bundle size
- Faster initial load

### 🟢 Puzzle Quality Improvements
- Ensure unique solutions
- Symmetrical puzzle generation
- Difficulty rating algorithm

---

## Fruit-Specific Twists (Creative Ideas)

### 🟢 Fruit Basket Power-Ups
- "Harvest": Reveal one random cell
- "Fertilizer": Highlight all possible positions for a fruit
- "Pruning": Auto-clear invalid candidates
- Limited power-ups per game or earnable

### 🟢 Fruit Collection/Unlockables
- Win games to unlock new fruit options
- Rare fruit variants (golden fruits)
- Animated fruit versions
- Fruit display showcase

### 🟢 Fruit Combinations/Bonuses
- Placing fruits in certain patterns (lines, corners)
- Combo multiplier for fast consecutive correct placements
- "Perfect row" bonus (complete row without mistakes)
- Fruit salad bonus (complete box quickly)

---

## Educational Value

### 🟢 Kids Mode
- Larger fruits and cells
- Easier puzzles with more hints
- Fun animations and sounds
- Achievement badges
- No time pressure
- Educational facts about fruits

### 🟢 Cognitive Training
- Focus/concentration exercises
- Memory challenge mode (hide fruits after delay)
- Speed training (timed challenges)
- Pattern recognition practice
