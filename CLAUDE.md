# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 application for a fruit-themed Sudoku game. The project uses React 19, Tailwind CSS v4, TypeScript, and Biome for code quality.

**UI Language: All user-facing text is in Thai.**

## Commands

### Development
- `bun run dev` - Start the development server at http://localhost:3000

### Build & Production
- `bun run build` - Build the application for production
- `bun run start` - Start the production server

### Code Quality
- `bun run lint` - Run Biome linter to check code quality
- `bun run format` - Format code with Biome
- `bun run check:write` - Run Biome linter with auto-fix
- `bun run check:write:unsafe` - Run Biome linter with unsafe auto-fixes

## Architecture

### Tech Stack
- **Framework**: Next.js 16.1.1 (App Router)
- **React**: Version 19.2.3 with TypeScript 5
- **Styling**: Tailwind CSS v4 with PostCSS
- **Linting/Formatting**: Biome 2.2.0 (replaces ESLint/Prettier)
- **Fonts**: Geist Sans and Geist Mono via next/font/google
- **Package Manager**: Bun
- **Hooks**: Husky 9.1.7 + lint-staged 16.2.7
- **Theming**: next-themes ^0.4.6 (dark/light mode)
- **UI Components**: Radix UI ^2.1.16 (dropdown menu)
- **Icons**: lucide-react ^0.562.0
- **State Management**: React built-in hooks (useState, useEffect, useCallback, useMemo)

### Project Structure
```
src/
├── app/
│   ├── layout.tsx       # Root layout with font & theme provider
│   ├── page.tsx         # Main page component with all game state
│   └── globals.css      # Global styles with Tailwind directives
├── components/          # React components
│   ├── SudokuGrid.tsx   # 9x9 grid renderer
│   ├── Board.tsx        # 3x3 box wrapper
│   ├── Cell.tsx         # Individual cell
│   ├── FruitPicker.tsx  # Fruit selection buttons
│   ├── LandingPage.tsx  # Landing page
│   ├── SettingsModal.tsx # Settings modal
│   └── GameMenu.tsx     # Dropdown menu (Radix UI)
└── lib/                 # Utilities, types, game logic
    ├── sudoku.ts        # Puzzle generation & validation
    ├── types.ts         # TypeScript types
    └── themes.ts        # Fruit theme definitions
```

### TypeScript Configuration
- Path alias: `src/*` maps to `./src/*`
- **IMPORTANT: Always use `src/` imports, never `@/`**
- Strict mode enabled
- React 19 JSX transform

### Biome Configuration
- Organizes imports automatically on save
- Enables recommended rules for Next.js and React
- 2-space indentation
- VCS integration with Git ignore file
- Runs on pre-commit via Husky + lint-staged

## Working Guidelines

### ALWAYS Check .relics First
Before starting any work, read the relevant files in `.relics/`:
- `.relics/concept.md` - Project concept and high-level features
- `.relics/architecture.md` - Technical architecture, types, and data flow
- `.relics/roadmap.md` - Implementation phases and progress tracking
- `.relics/future.md` - Future feature ideas with priorities

### Update Roadmap
After completing any task:
1. Mark the item as completed `[x]` in `.relics/roadmap.md`
2. Add notes if needed (e.g., implementation details, decisions made)

## Commit Guidelines

Use conventional commits when creating git commits:

```
feat:  new feature
fix:   bug fix
chore: maintenance, config, deps
refactor: code restructuring
docs:  documentation
test:  tests
perf:  performance
```

Examples:
- `feat: add sudoku puzzle generation`
- `fix: prevent selecting initial cells`
- `chore: configure husky and lint-staged`
