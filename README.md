# Frudoku

A fruit-themed Sudoku game built with Next.js 16, React 19, and Tailwind CSS v4. Replace numbers with colorful fruit emojis and enjoy classic Sudoku puzzles with a fresh twist.

## Features

- **Fruit-Themed Gameplay** - Play Sudoku with vibrant fruit emojis instead of numbers
- **3 Difficulty Levels** - Easy (40 holes), Medium (50 holes), Hard (60 holes)
- **Dark/Light Mode** - Toggle between themes with system preference detection
- **Custom Fruit Themes** - Choose from Default, Tropical, or create your own custom theme
- **Conflict Detection** - Toggle to highlight conflicting cells in real-time
- **Responsive Design** - Mobile-friendly with touch-optimized controls
- **Thai Localization** - All UI text in Thai

## Setup

### Prerequisites

- Node.js 18+

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/fruit-sudoku.git
cd frudoku

# Install dependencies (choose one)
bun install    # fastest
npm install
yarn install
pnpm install

# Start development server
bun run dev    # or npm run dev, yarn dev, pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to play.

### Build for Production

```bash
bun run build
bun run start
```

## How to Play

1. **Select a cell** - Tap any empty cell on the 9x9 grid
2. **Choose a fruit** - Select from the 9 fruit options at the bottom
3. **Fill the grid** - Complete the puzzle so each row, column, and 3x3 box contains all 9 fruits
4. **No conflicts** - Each fruit can appear only once per row, column, and box

## Code Quality

```bash
bun run lint          # Run linter
bun run format        # Format code
bun run check:write   # Auto-fix issues
```

## License

MIT
