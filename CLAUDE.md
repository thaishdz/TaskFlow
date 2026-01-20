# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based task board application built with Vite, TypeScript, and Tailwind CSS v4. The app allows users to create task lists with custom icons, organize tasks visually, and persist data using localStorage.

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
- **clsx** for conditional class name composition

### Project Structure

```
src/
├── assets/icons/       # SVG icons (airplane, house, goal, market, add, edit, etc.)
├── components/ui/
│   ├── Button/         # Configurable button with variant-based styling
│   ├── Card/           # Card.tsx (task display) + CardList.tsx (list container)
│   ├── Dialog/         # Modal dialog with backdrop
│   ├── Form/           # TaskListForm for creating new lists
│   └── Icon/           # SVG icon component with type-safe names
├── context/
│   └── CardsProvider.tsx  # React Context for global state management
├── hooks/
│   └── useLocalStorage.tsx  # Custom hook for localStorage persistence
├── Board.tsx           # Main application component
├── main.tsx            # Application entry point
└── index.css           # Tailwind CSS import
```

Each UI component follows this pattern:
- Component implementation in `ComponentName.tsx`
- Re-export via `index.ts` for clean imports

### State Management

**CardsProvider** (`src/context/CardsProvider.tsx`)
- React Context providing global state for task lists
- Exposes `useCards()` hook with: `lists`, `addList`, `removeList`, `addTask`, `updateTask`, `removeTask`
- Persists data automatically via `useLocalStorage` hook

**useLocalStorage Hook** (`src/hooks/useLocalStorage.tsx`)
- Generic hook for syncing state with localStorage
- Handles JSON serialization/deserialization
- Used by CardsProvider for data persistence

### Component Design Patterns

**Button Component** (`src/components/ui/Button/Button.tsx`)
- Uses configuration objects for variant-based styling
- Variants: `add`, `edit`, `draggable`, `link`, `destructive`, `success`, `cancel`
- Pattern: `buttonConfig: Record<ButtonType, {styles, icon}>`
- Uses `clsx` for merging base styles + variant styles + user overrides
- SVG icons imported as React components via `?react` suffix

**Card Component** (`src/components/ui/Card/Card.tsx`)
- Implements draft mode for inline task editing
- Supports HTML5 drag and drop for task reordering
- Toggle between read mode and edit mode
- Task completion toggle on click

**CardList Component** (`src/components/ui/Card/CardList.tsx`)
- Accordion-style list display with expand/collapse
- Manages which card is currently expanded via local state

**Dialog Component** (`src/components/ui/Dialog/Dialog.tsx`)
- Implements modal with backdrop using fixed positioning
- Uses `event.stopPropagation()` to prevent closing when clicking dialog content
- Controlled visibility via `visible` prop

**Icon Component** (`src/components/ui/Icon/Icon.tsx`)
- Type-safe icon names: `'travel' | 'chores' | 'personal' | 'market'`
- SVG icons imported as React components using Vite's `?react` suffix
- Centralized icon mapping via `Record<IconName, React.ReactNode>`

**TaskListForm Component** (`src/components/ui/Form/TaskListForm.tsx`)
- Manages form state for title, icon selection, and tasks
- Icon selection via button grid with visual feedback

### SVG Icon Imports

Icons are imported as React components using Vite's SVG plugin:
```typescript
import AirplaneIcon from '@/assets/icons/airplane.svg?react'
```

Available icons in `src/assets/icons/`:
- Category icons: `airplane.svg`, `house.svg`, `goal.svg`, `market.svg`
- Action icons: `add.svg`, `edit.svg`, `save.svg`, `bin_24px.svg`, `cross_8px.svg`, `hamburger.svg`

### TypeScript Configuration

The project uses strict TypeScript settings:
- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noFallthroughCasesInSwitch: true`
- `noUncheckedSideEffectImports: true`

Path alias configured: `@/` maps to `src/`

### Styling Approach

All styling is done with Tailwind CSS utility classes directly in components. Common patterns:
- Responsive design using `sm:` and `md:` breakpoints
- Hover states with `hover:` prefix
- Transitions via `transition-colors`, `transition-transform`
- Shadow effects: `shadow-lg`
- Focus states: `focus:ring-2 focus:ring-blue-500`
- Conditional classes via `clsx()`

## Key Implementation Notes

1. **Component Imports**: All UI components are re-exported through index files for clean imports (e.g., `import { Button } from "./components/ui/Button"`)

2. **Type Safety**: Components use TypeScript interfaces/types for props, with type-safe unions for variants (e.g., `ButtonType`, `IconName`)

3. **Configuration Pattern**: Variant-based components use Record types for configuration objects rather than switch statements

4. **Event Handling**: Dialog uses event propagation control to manage backdrop clicks vs content clicks

5. **Drag and Drop**: Card component implements HTML5 drag and drop API for reordering tasks in edit mode

6. **Data Types**: Core types defined in `TaskListForm.tsx`:
   - `Task`: `{ id: string, name: string, completed: boolean }`
   - `TaskListData`: `{ id: string, title: string, icon: IconName, tasks: Task[] }`
