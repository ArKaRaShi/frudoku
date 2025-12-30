# CLAUDE.md

This document is the jump-off point for Claude Code (claude.ai/code) when working in this repo. Treat it as an index: it tells you where to look for the detailed project knowledge that lives in `.relics/`.

## Quick Overview

-   Fruit-themed Sudoku built with Next.js 16 + React 19, Tailwind CSS v4, TypeScript, Bun, and Biome.
-   All UI copy **must remain in Thai**.
-   Imports use the `src/*` alias (never `@/`). The alias setup, state types, props flow, and lib contracts are described in `.relics/architecture.md`.

## Reference Index (.relics/)

Always consult the matching document before coding or making decisions:

-   `.relics/concept.md` — Product vision, core mechanics, and UX guardrails.
-   `.relics/architecture.md` — Source of truth for the tech stack, directory structure, import convention, React state shape (`GameState`, `Cell`, etc.), props flow diagram, Sudoku/theming utilities, difficulty definitions, and persistence keys. If you need anything "architecture" related, open this file first.
-   `.relics/roadmap.md` — Phase checklist. Update it after each task: check off completed items and note key decisions.
-   `.relics/executions/` — **Task execution plans** broken down from roadmap features. Each file contains step-by-step technical implementation details. Before starting a feature, check if an execution plan exists here. If not, use the `task-planner` skill to create one.
-   `.relics/future.md` — Approved future enhancements + priority tags.
-   `.relics/refactor/v1-component-organization.md` — Notes on component-level refactors (e.g., splitting layout/state responsibilities).

## Commands

-   `bun run dev` – Start the dev server (http://localhost:3000)
-   `bun run build` – Production build
-   `bun run start` – Serve the production build
-   `bun run lint` – Run Biome
-   `bun run format` – Format with Biome
-   `bun run check:write` / `bun run check:write:unsafe` – Biome with auto-fix (safe vs. unsafe rules)

## Working Guidelines

-   **Before starting ANY phase/feature work:**
    1. Check `.relics/executions/` for an existing execution plan
    2. If no plan exists, use `/task-planner` skill to create one first
    3. Do NOT write code without an execution plan
-   Read the relevant `.relics/` doc before touching code; architecture details should never be re-invented in this file.
-   Keep Biome happy (2-space indentation, organized imports). Husky + lint-staged run the checks on commit.
-   Verification = lint only. Do **not** run `bun run build` (or any build command) unless the user explicitly requests it; use `bun run lint` for validation.
-   After finishing a change, update `.relics/roadmap.md` as described above.

## Commit Guidelines

Use conventional commits:

```
feat: new feature
fix: bug fix
chore: maintenance/config/deps
refactor: code restructuring
docs: documentation
test: tests
perf: performance
```

Examples:

-   `feat: add sudoku puzzle generation`
-   `fix: prevent selecting initial cells`
-   `chore: configure husky and lint-staged`
