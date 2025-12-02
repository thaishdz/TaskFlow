# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based task board application built with Vite, TypeScript, and Tailwind CSS v4. The app allows users to create task lists with custom icons and organize tasks visually.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production (runs TypeScript compiler and Vite build)
npm run build

# Lint the codebase
npm run lint

# Preview production build
npm run preview
```

## Architecture

### Tech Stack
- **React 19** with TypeScript (strict mode enabled)
- **Vite 7** as build tool
- **Tailwind CSS v4** via @tailwindcss/vite plugin
- **ESLint** with TypeScript, React Hooks, and React Refresh plugins

### Component Structure

The project follows a component-based architecture with UI components organized in `src/components/ui/`:

```
src/
├── components/ui/
│   ├── Button/        # Configurable button with type-based styling
│   ├── Card/          # Task list display card
│   ├── Dialog/        # Modal dialog with backdrop
│   ├── Emoji/         # Type-safe emoji component
│   └── Form/          # TaskListForm for creating new lists
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Tailwind CSS import
```

Each UI component follows this pattern:
- Component implementation in `ComponentName.tsx`
- Re-export via `index.ts` for clean imports

### Component Design Patterns

**Button Component** (`src/components/ui/Button/Button.tsx`)
- Uses configuration objects for type-based styling
- Pattern: `buttonConfig: Record<ButtonType, {styles, icon}>`
- Supports className overrides following the pattern: `{base | type | overrides}`

**Dialog Component** (`src/components/ui/Dialog/Dialog.tsx`)
- Implements modal with backdrop using fixed positioning
- Uses `event.stopPropagation()` to prevent closing when clicking dialog content
- Controlled visibility via `visible` prop

**Emoji Component** (`src/components/ui/Emoji/Emoji.tsx`)
- Type-safe emoji names using union types: `'travel' | 'chores' | 'personal'`
- Centralized emoji mapping via `Record<EmojiName, string>`

**TaskListForm Component** (`src/components/ui/Form/TaskListForm.tsx`)
- Manages form state for title, icon selection, and tasks
- Emoji selection via button grid with visual feedback

### TypeScript Configuration

The project uses strict TypeScript settings:
- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noFallthroughCasesInSwitch: true`
- `noUncheckedSideEffectImports: true`

### Styling Approach

All styling is done with Tailwind CSS utility classes directly in components. Common patterns:
- Responsive design using `md:` breakpoints
- Hover states with `hover:` prefix
- Transitions via `transition-colors`
- Shadow effects: `shadow-lg`
- Focus states: `focus:ring-2 focus:ring-blue-500`

## Key Implementation Notes

1. **Component Imports**: All UI components are re-exported through index files for clean imports (e.g., `import { Button } from "./components/ui/Button"`)

2. **Type Safety**: Components use TypeScript interfaces/types for props, with type-safe enums for variants (e.g., `ButtonType`, `EmojiName`)

3. **Configuration Pattern**: Variant-based components use Record types for configuration objects rather than switch statements

4. **Event Handling**: Dialog uses event propagation control to manage backdrop clicks vs content clicks
