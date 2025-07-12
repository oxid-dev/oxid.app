# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Oxid is an open-source desktop application that serves as a free alternative to Bolt.new and Cursor. It's a cross-platform AI-powered coding tool built with React and Tauri.

### Key Product Details
- **Desktop-only**: No web app, all processing happens locally on the user's machine
- **Free/Open Source**: Users bring their own API keys, no server infrastructure costs
- **Privacy-first**: All data stays on the user's machine
- **MVP Strategy**: Using Claude Code SDK initially, with plans to build custom agent system later

### Technology Stack
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS v4
- **Desktop Framework**: Tauri v2 (Rust backend runs locally)
- **State Management**: Zustand (implemented)
- **Code Editor**: Monaco Editor (to be implemented)
- **UI Components**: ShadCN UI + Radix UI (implemented)

### Development Philosophy
- Minimize Rust code - use JavaScript/TypeScript wherever possible
- Only write Rust when Tauri's prebuilt plugins don't support something or for significant performance gains
- Keep the architecture modular to allow easy swapping from Claude Code SDK to custom agents
- **Always use Zustand for global state** - Never create Context APIs for state management

## Commands

```bash
# Development
npm run dev          # Start Vite dev server
npm run tauri dev    # Start Tauri in development mode

# Building
npm run build        # Build web assets
npm run tauri build  # Build desktop application

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run type-check   # Type check with TypeScript
```

## Architecture

### Current Structure (Implemented)
```
src/
├── App.tsx                    # Router provider entry point
├── App.css                    # Tailwind imports
├── main.tsx                   # React entry point
├── ui/                        # UI components (atomic design)
│   ├── primitives/            # ShadCN components (foundation)
│   │   ├── button.tsx         # ShadCN Button primitive
│   │   ├── input.tsx          # ShadCN Input primitive
│   │   ├── textarea.tsx       # ShadCN TextArea primitive
│   │   └── dialog.tsx         # ShadCN Dialog primitive
│   ├── atoms/                 # Generic component wrappers
│   │   ├── Button/            # Button wrapper with loading states
│   │   ├── Input/             # Input wrapper with error handling
│   │   └── TextArea/          # TextArea wrapper with auto-resize
│   ├── molecules/             # Component combinations
│   │   └── MessageBubble/     # Chat message display
│   └── layouts/
│       └── AppLayout/         # Main app shell
├── features/                  # Feature-based organization
│   └── agent-chat/            # Chat feature
│       ├── components/
│       │   └── containers/
│       │       └── AgentChatContainer.tsx  # Main chat interface
│       ├── hooks/
│       │   └── useAgentChat.ts             # Chat logic hook
│       ├── store/
│       │   └── agentChatStore.ts           # Zustand chat store
│       └── types.ts           # Chat-related types
├── pages/                     # File-based routing
│   ├── index.tsx             # Home (redirects to chat)
│   ├── chat/index.tsx        # Chat page
│   └── settings/index.tsx    # Settings page
├── router/                   # React Router configuration
│   ├── index.tsx            # Hash router setup
│   └── routes.ts            # Route definitions
├── lib/
│   └── utils/
│       └── cn.ts            # Tailwind merge utility
└── types/
    └── common.ts            # Shared type definitions

src-tauri/
├── src/
│   ├── main.rs              # Tauri entry point
│   └── lib.rs               # Tauri app logic (minimal)
└── tauri.conf.json          # Tauri configuration
```

### Implemented Features
- **Complete Chat UI**: Working chat interface with mock AI responses
- **ShadCN UI + Atomic Design**: Professional accessibility foundation with custom design system
- **Design Token System**: CSS variables and theme support for consistent styling
- **State Management**: Zustand store for chat state
- **Routing**: React Router with hash routing for desktop apps
- **Mock AI Integration**: Simulated AI responses for testing
- **Responsive Design**: Dark theme, auto-scrolling, typing indicators
- **Development Tooling**: ESLint, Prettier, TypeScript strict mode
- **Path Aliases**: Configured for clean imports (see Import Conventions below)

### Future Architecture Plans
- **AI Provider Abstraction**: Interface to swap between Claude Code SDK and custom implementations
- **Local LLM Integration**: Users can bring their own API keys (OpenAI, Anthropic, etc.)
- **Agent System**: Custom tool calling, orchestration, and multi-step workflows
- **Local Storage**: SQLite for metadata, file system for projects
- **Code Editor Integration**: Monaco Editor for file editing
- **File Management**: Project/file explorer and operations

## Development Status

### ✅ Completed (MVP Phase 1)
- [x] Project setup with Tauri v2 + React 18 + TypeScript
- [x] Complete folder structure following atomic design
- [x] UI component library (atoms, molecules) with dark theme
- [x] Working chat interface with mock AI responses
- [x] State management with Zustand
- [x] Routing with React Router (hash routing for desktop)
- [x] Development tooling (ESLint, Prettier, TypeScript)
- [x] Production build pipeline

### 🚧 Next Phase (AI Integration)
- [ ] Replace mock AI with Claude Code SDK
- [ ] File system operations via Tauri
- [ ] Project management (open/save/create)
- [ ] Settings page with API key management
- [ ] Error handling and user feedback

### 🔮 Future Phases
- [ ] Monaco Editor integration for code editing
- [ ] Custom agent system architecture
- [ ] Multi-LLM support (user's own API keys)
- [ ] Local indexing and RAG capabilities
- [ ] Plugin system for extensibility

## Important Notes

1. **No Backend**: All logic runs client-side in the Tauri app
2. **API Keys**: Will be stored securely using OS keychain (via Tauri)
3. **Performance**: Heavy operations should use web workers or Rust (if necessary)
4. **Security**: Never expose API keys to the frontend, handle in Rust layer
5. **Mock AI**: Currently using mock responses in `useAgentChat.ts` - replace with real AI integration

## Testing the Current Implementation

1. **Development**: `npm run tauri dev` - Full desktop app with hot reload
2. **Web Preview**: `npm run dev` - Web version for UI development
3. **Build**: `npm run build` - Production build
4. **Type Check**: `npm run type-check` - TypeScript validation
5. **Lint**: `npm run lint` - Code quality check

The chat interface is fully functional with mock AI responses. Try typing "hello", "help", or "test" to see different mock responses.

## Import Conventions

### Path Aliases
The project uses path aliases for clean imports. Always use aliases instead of relative imports when importing across different folders:

**Configured Aliases:**
- `@/*` → `./src/*` (root src)
- `@/ui/*` → `./src/ui/*` (UI components)
- `@/primitives/*` → `./src/ui/primitives/*` (ShadCN primitives)
- `@/features/*` → `./src/features/*` (feature modules)
- `@/pages/*` → `./src/pages/*` (pages)
- `@/lib/*` → `./src/lib/*` (utilities)
- `@/types/*` → `./src/types/*` (type definitions)
- `@/stores/*` → `./src/stores/*` (state stores)
- `@/router/*` → `./src/router/*` (routing)

**Usage Rules:**
```typescript
// ✅ Good: Use aliases for cross-folder imports
import { Button } from '@/ui/atoms';
import { useAgentChat } from '@/features/agent-chat';
import { router } from '@/router';

// ✅ Good: Use relative imports within the same component folder (atomic design)
import { ButtonProps } from './Button.types';  // Within same atom/molecule/organism

// ❌ Bad: Relative imports across folders
import { Button } from '../../ui/atoms/Button';
import { useAgentChat } from '../../../features/agent-chat/hooks/useAgentChat';
```

**Atomic Design Exception:**
Within the same atomic component (atom/molecule/organism), use relative imports for internal files:
- `./Component.types.ts`
- `./Component.styles.ts` 
- `./index.ts`

This keeps component internals self-contained while using aliases for external dependencies.

## Component Architecture: ShadCN + Atomic Design

### **Architecture Overview**
The project uses a hybrid approach combining ShadCN UI primitives with atomic design principles:

```
Primitives (ShadCN) → Atoms (Wrappers) → Molecules → Organisms → Features
```

### **Layer Responsibilities**

**1. Primitives Layer (`src/ui/primitives/`)**
- Raw ShadCN components with accessibility and theming built-in
- Foundation layer providing consistent behavior and design tokens
- Examples: `button.tsx`, `input.tsx`, `textarea.tsx`, `dialog.tsx`

**2. Atoms Layer (`src/ui/atoms/`)**
- Generic wrapper components around ShadCN primitives
- Add custom functionality (loading states, error handling, auto-resize)
- Maintain consistent API across the application
- Examples: `Button/` (adds loading), `Input/` (adds error), `TextArea/` (adds auto-resize)

**3. Molecules/Organisms (`src/ui/molecules/`, `src/ui/organisms/`)**
- Combinations of atoms for generic UI patterns
- Stateless and reusable across features
- Examples: `MessageBubble/`, `SearchField/`, `FormField/`

**4. Features Layer (`src/features/`)**
- Business logic and feature-specific components
- Use atoms/molecules + add domain-specific behavior
- Examples: `AgentChatContainer`, `SendMessageButton`

### **Usage Guidelines**

**✅ Use ShadCN Primitives directly when:**
- Building new atomic wrappers
- Need access to raw ShadCN functionality

**✅ Use Atoms when:**
- Building molecules, organisms, or feature components
- Need the enhanced functionality (loading, errors, etc.)

**✅ Use Feature Components when:**
- Implementing business logic
- Building domain-specific UI patterns

## Modern UI Stack
- **Tailwind CSS v4** with OKLCH colors and CSS-based configuration
- **Latest ShadCN components** with `data-slot` attributes and modern focus rings

**Example Implementation:**
```typescript
// Primitive (ShadCN foundation)
import { Button as ShadCNButton } from '@/ui/primitives/button'

// Atom (generic wrapper)
import { Button } from '@/ui/atoms/Button'  // Adds loading states

// Feature component (business logic)
import { SendButton } from '@/features/agent-chat/components/SendButton'  // Adds chat logic
```

This architecture provides professional accessibility (ShadCN) + design system consistency (atoms) + business logic separation (features).

### **Development Guidelines**

**🎨 Design Token Usage:**
- ✅ **Always use design tokens**: `bg-background`, `text-foreground`, `border-border`
- ❌ **Never use hardcoded colors**: `bg-gray-900`, `text-white`, `border-gray-800`
- ✅ **Use semantic tokens**: `text-muted-foreground`, `bg-destructive`, `text-primary`

**🌙 Theme System:**
- Dark theme is applied by default via `dark` class on root AppLayout
- All components automatically inherit theme via CSS variables
- CSS variables defined in `src/App.css` with `:root` and `.dark` variants

**⚠️ ESLint & ShadCN:**
- ShadCN components may trigger `react-refresh/only-export-components` warnings
- Add `// eslint-disable-next-line react-refresh/only-export-components` above exports
- This is normal for components that export both component + utility functions

## Git Information

- Default branch: `main`
- Remote repository: `git@github.com:oxid-dev/oxid.app.git`
- License: MIT (Copyright 2025 oxid-dev)