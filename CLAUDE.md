# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 application for a fruit-themed Sudoku game. The project uses React 19, Tailwind CSS v4, TypeScript, and Biome for code quality.

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
- **Framework**: Next.js 16 (App Router)
- **React**: Version 19.2.3 with TypeScript
- **Styling**: Tailwind CSS v4 with PostCSS
- **Linting/Formatting**: Biome (replaces ESLint/Prettier)
- **Fonts**: Geist Sans and Geist Mono via next/font/google
- **Package Manager**: Bun

### Project Structure
```
src/
├── app/
│   ├── layout.tsx       # Root layout with font configuration
│   ├── page.tsx         # Main page component
│   └── globals.css      # Global styles with Tailwind directives
├── components/          # React components
└── lib/                 # Utilities, types, game logic
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

## Working Guidelines

### ALWAYS Check .relics First
Before starting any work, read the relevant files in `.relics/`:
- `.relics/concept.md` - Project concept and high-level features
- `.relics/architecture.md` - Technical architecture, types, and data flow
- `.relics/roadmap.md` - Implementation phases and progress tracking
- `.relics/future.md` - Future feature ideas

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
