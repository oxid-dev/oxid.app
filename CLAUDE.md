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
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Desktop Framework**: Tauri v2 (Rust backend runs locally)
- **State Management**: Zustand (to be implemented)
- **Code Editor**: Monaco Editor (to be implemented)
- **UI Components**: Radix UI (to be implemented)

### Development Philosophy
- Minimize Rust code - use JavaScript/TypeScript wherever possible
- Only write Rust when Tauri's prebuilt plugins don't support something or for significant performance gains
- Keep the architecture modular to allow easy swapping from Claude Code SDK to custom agents

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
│   ├── atoms/                 # Basic building blocks
│   │   ├── Button/            # Button with variants, loading states
│   │   ├── Input/             # Input with error handling
│   │   └── TextArea/          # Auto-resizing textarea
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
- **Atomic Design System**: Reusable UI components with proper TypeScript types
- **State Management**: Zustand store for chat state
- **Routing**: React Router with hash routing for desktop apps
- **Mock AI Integration**: Simulated AI responses for testing
- **Responsive Design**: Dark theme, auto-scrolling, typing indicators
- **Development Tooling**: ESLint, Prettier, TypeScript strict mode

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

## Git Information

- Default branch: `main`
- Remote repository: `git@github.com:oxid-dev/oxid.app.git`
- License: MIT (Copyright 2025 oxid-dev)