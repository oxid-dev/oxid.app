# Local Backend-Frontend Communication Architecture

## Overview
High-level architecture for communication between backend (data layer) and frontend (UI layer) for Oxid desktop application.

## Core Architecture

```
┌─────────────────────────────────────────────────────┐
│                    UI Layer                         │
│  (React Components + Zustand Stores)                │
└─────────────────────────────────────────────────────┘
                         ↕
┌─────────────────────────────────────────────────────┐
│                 Backend Layer                       │
│  (SQLite + File System + Agent Integration)         │
└─────────────────────────────────────────────────────┘
```

## Communication Approach: Direct Function Calls

```typescript
// Frontend directly imports and calls backend services
import { chatService, fileService, projectService } from '@/backend/services';

const useChatStore = create((set) => ({
  sendMessage: async (content) => {
    const response = await chatService.sendMessage(content);
    set({ messages: [...messages, response] });
  }
}));
```

### Why Direct Function Calls:
- ✅ **Simplicity**: No complex IPC or HTTP setup
- ✅ **Performance**: No serialization/communication overhead
- ✅ **Type Safety**: Shared TypeScript types across layers
- ✅ **Development Speed**: Easy debugging and testing

## Data Flow Patterns

### User Actions
```
User Input → UI Component → Zustand Action → Service Call → Backend Processing → Database Update → State Update → UI Re-render
```

### Agent Streaming
```
Agent Processing → Component Stream → Backend Buffer → Frontend Event → State Append → UI Update (real-time)
```

## Service Categories

1. **Chat Services**: Message operations, history, search
2. **Project Services**: Project management, file operations
3. **Agent Services**: Claude Code SDK integration, streaming responses
4. **File Services**: File operations (create, read, write, delete)
5. **Settings Services**: User preferences, API keys, themes

## State Management

### Frontend State (Zustand)
- **Ephemeral State**: Current view, UI flags, selections
- **Cached State**: Recent messages, active project
- **Derived State**: Computed values, filtered lists

### Backend State (SQLite + File System)
- **Persistent State**: All messages, projects, settings, user data
- **File State**: Project files, configurations, templates
- **Cache State**: AI responses, file metadata
- **Session State**: Open tabs, recent files, workspace layout

## Implementation Structure

```typescript
oxid-app/
├── src/                    // Frontend only
│   ├── features/
│   ├── components/
│   └── stores/
├── backend/                // Backend outside src
│   ├── resources/
│   │   ├── chat/
│   │   │   ├── controllers/
│   │   │   │   ├── sendMessage.controller.ts
│   │   │   │   ├── getMessages.controller.ts
│   │   │   │   ├── deleteMessage.controller.ts
│   │   │   │   └── index.ts
│   │   │   ├── queries/
│   │   │   │   ├── createMessage.query.ts
│   │   │   │   ├── findMessages.query.ts
│   │   │   │   ├── deleteMessage.query.ts
│   │   │   │   └── index.ts
│   │   │   ├── services/
│   │   │   │   ├── messageValidation.service.ts
│   │   │   │   ├── messageFormatting.service.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts    // Exports chat resource
│   │   ├── project/
│   │   │   ├── controllers/
│   │   │   ├── queries/
│   │   │   ├── services/
│   │   │   └── index.ts
│   │   └── file/
│   │       ├── controllers/
│   │       ├── services/   // No queries needed for file ops
│   │       └── index.ts
│   ├── agent/
│   │   └── claude-code/
│   ├── database/
│   ├── http.client.ts      // Future HTTP client
│   └── index.ts            // Main backend client
└── shared/
    └── types/
```

### Resource Pattern Benefits
- **Separation of Concerns**: Controllers handle routing, queries handle DB, services handle business logic
- **Scalability**: Easy to add new files as features grow
- **Maintainability**: Each file has a single responsibility
- **Testability**: Can test each layer independently

## Backend Client Pattern

### Backend Client (Handles Local/HTTP Logic)
```typescript
// backend/index.ts
import { chatControllers } from './resources/chat';
import { projectControllers } from './resources/project';
import { fileControllers } from './resources/file';

export const backend = {
  chat: {
    // Local only
    async getMessages(chatId: string) {
      return chatControllers.getMessages(chatId);
    },
    
    // Conditional: local for free, HTTP for pro
    async sendMessage(content: string, chatId: string) {
      if (authToken) {
        return httpClient.post('/api/chat/send', { content, chatId });
      }
      return chatControllers.sendMessage(content, chatId);
    },
    
    // HTTP only (pro feature)
    async getAnalytics(chatId: string) {
      if (!authToken) throw new Error('Pro feature');
      return httpClient.get(`/api/chat/${chatId}/analytics`);
    }
  },
  
  project: {
    async createProject(name: string, path: string) {
      return projectControllers.createProject(name, path);
    },
    
    async getProjects() {
      return projectControllers.getProjects();
    }
  },
  
  file: {
    async createFile(path: string, content: string) {
      return fileControllers.createFile(path, content);
    },
    
    async readFile(path: string) {
      return fileControllers.readFile(path);
    }
  }
};

// HTTP client instance (for future pro features)
const httpClient = new HttpClient('https://api.oxid.dev');

// Auth token management
export const setAuthToken = (token: string | null) => {
  authToken = token;
  httpClient.setAuthToken(token);
};
```

### Example Controller Implementation
```typescript
// backend/resources/chat/controllers/sendMessage.controller.ts
import { createMessageQuery } from '../queries';
import { validateMessage, formatMessage } from '../services';

export async function sendMessage(content: string, chatId: string) {
  // Validate input
  const validated = await validateMessage(content);
  
  // Apply business logic
  const formatted = await formatMessage(validated);
  
  // Save to database
  const message = await createMessageQuery(formatted, chatId);
  
  return message;
}
```

### Frontend Usage
```typescript
// Frontend just uses backend client directly
import { backend } from '../backend';

const useChatStore = create((set) => ({
  sendMessage: async (content: string) => {
    // Backend decides local vs HTTP
    const response = await backend.chat.sendMessage(content, chatId);
    set(state => ({ messages: [...state.messages, response] }));
  }
}));
```

## Key Features

- **Single Backend Client**: Frontend imports and uses `backend` directly
- **Internal Routing**: Backend client decides local vs HTTP based on auth/feature
- **File Operations**: All async, non-blocking using Tauri APIs
- **Database**: Tauri SQL plugin (fast, same process)
- **Agent Processing**: Node.js sidecar for Claude Code SDK (CLI wrapper needs Node.js)
- **Auth Token**: Set once, backend client handles all HTTP headers
- **Flexible**: Each feature can be local-only, HTTP-only, or mixed

## Process Architecture

```
WebView (Same Process)          Node.js Sidecar (Separate Process)
├── Frontend (React)            ├── Claude Code SDK
├── Backend client              ├── CLI spawning
├── File operations (Tauri)     └── Shell commands
├── Database (Tauri SQL)        
└── Settings, UI logic          
```

**Why Sidecar for Agent**: Claude Code SDK is a CLI wrapper that needs `child_process`, `fs`, and shell access - not available in WebView.