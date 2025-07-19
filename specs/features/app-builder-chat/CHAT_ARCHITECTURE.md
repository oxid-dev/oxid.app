# Chat Architecture Documentation

## Overview
This document outlines the chat architecture for Oxid, an AI-powered code assistant. The architecture is designed to be flexible, extensible, and strongly typed to support both the current Claude Code SDK integration and future custom agent implementations.

## Core Design Principles
1. **Strongly Typed**: No `any` types - everything has proper TypeScript definitions
2. **Component-Based**: Messages contain arrays of typed components
3. **Extensible**: Easy to add new models, modes, and component types
4. **Stream-Friendly**: Components can be added/updated during streaming
5. **Consistent**: Similar properties are stored at the same level across message types

## Type Definitions

### Enums and Constants

```typescript
// Supported AI Models
export enum AIModel {
  GPT_4 = 'gpt-4',
  GPT_3_5 = 'gpt-3.5',
  CLAUDE = 'claude',
  // Add more models as needed
}

// Chat Modes (affects agent behavior)
export enum ChatMode {
  PLANNER = 'planner',  // Agent creates plans without code execution
  CODER = 'coder',      // Agent can modify code directly
  // Add more modes as needed
}

// Message Status
export enum MessageStatus {
  PENDING = 'pending',       // Message created but not sent
  STREAMING = 'streaming',   // Message is being received/processed
  COMPLETED = 'completed',   // Message fully received and processed
  ERROR = 'error',          // Message encountered an error
  TERMINATED = 'terminated', // User manually stopped the message
}

// Agent Types
export enum AgentType {
  CLAUDE_CODE_SDK = 'claude-code-sdk',
  CUSTOM = 'custom',
  // Add more agent types as we implement them
}

// Message Component Types (examples - will be extended)
export enum MessageComponentType {
  THINKING = 'thinking',
  TOOL_CALL = 'tool-call',
  FILE_EDIT = 'file-edit',
  // Add more component types as needed
}

// Component Status
export enum ComponentStatus {
  STREAMING = 'streaming',   // Component is being received
  COMPLETED = 'completed',   // Component fully received
  ERROR = 'error',          // Component encountered an error
}
```

### Message Status Explanations

- **PENDING**: Message has been created in the UI but not yet sent to the agent
- **STREAMING**: Message is actively being processed/received from the agent
- **COMPLETED**: Message has been fully processed and no more updates expected
- **ERROR**: A global error occurred (network failure, API timeout, etc.)
- **TERMINATED**: User manually stopped the message processing

### Base Message Structure

```typescript
interface BaseMessage {
  id: string;
  timestamp: Date;
  type: 'user' | 'agent';
  status: MessageStatus;
  model: AIModel;          // Consistent: both user and agent messages have model
  mode: ChatMode;          // Consistent: both user and agent messages have mode
  metadata?: MessageMetadata;
}

interface MessageMetadata {
  // Common metadata that might apply to any message
  editedAt?: Date;
  parentMessageId?: string;  // For message threading if needed
  [key: string]: unknown;    // Allow extension but require explicit typing
}
```

### User Message

```typescript
interface UserMessage extends BaseMessage {
  type: 'user';
  content: string;           // Main text input
  attachments?: UserAttachment[];
}

interface UserAttachment {
  id: string;
  type: 'file' | 'image';
  name: string;
  filePath: string;          // Path to the file/image
  metadata?: {
    mimeType?: string;       // File type information
    size?: number;           // File size in bytes
  };
}
```

### Agent Message

```typescript
interface AgentMessage extends BaseMessage {
  type: 'agent';
  agentType: AgentType;
  components: MessageComponent[];  // Type-safe components added as they stream in
  metadata?: AgentMessageMetadata;
}

interface AgentMessageMetadata extends MessageMetadata {
  tokenUsage?: {
    prompt: number;
    completion: number;
    total: number;
  };
  executionTime?: number;    // Total execution time in ms
  contextSize?: number;      // Number of tokens in context
}
```

### Message Component System

The component system is the core of our extensible architecture. Each component type has its own data structure:

```typescript
// Base component interface
interface BaseComponent {
  id: string;
  timestamp: Date;
  status: ComponentStatus;
  metadata?: ComponentMetadata;
}

interface ComponentMetadata {
  duration?: number;         // Execution time for this component
  retryCount?: number;       // If component was retried
  [key: string]: unknown;
}

// Example component-specific data structures
// These are just examples - we'll add more as we implement them

interface ThinkingData {
  content: string;           // The agent's thinking process
  isComplete: boolean;       // Still streaming or complete
}

interface ToolCallData {
  toolName: string;          // e.g., 'file-search', 'web-search'
  parameters: Record<string, unknown>;
  result?: unknown;          // Tool-specific result structure
  error?: string;           // If tool call failed
}

interface FileEditData {
  filePath: string;
  operation: 'create' | 'edit' | 'delete';
  language?: string;
  diff?: {
    before: string;
    after: string;
  };
  content?: string;          // For file creation
  error?: string;
}

// Type-safe components using discriminated union
interface ThinkingComponent extends BaseComponent {
  type: MessageComponentType.THINKING;
  data: ThinkingData;
}

interface ToolCallComponent extends BaseComponent {
  type: MessageComponentType.TOOL_CALL;
  data: ToolCallData;
}

interface FileEditComponent extends BaseComponent {
  type: MessageComponentType.FILE_EDIT;
  data: FileEditData;
}

// Union type for all components (will be extended)
type MessageComponent = 
  | ThinkingComponent
  | ToolCallComponent
  | FileEditComponent;
```

## Component Library Vision

Each message component type will have:
1. **Data Structure**: Strongly typed interface (defined above)
2. **UI Component**: React component for rendering
3. **Streaming Handler**: Logic for updating during streaming
4. **Actions**: User interactions (expand/collapse, retry, copy, etc.)

Example component structure:
```typescript
// Each component will follow this pattern
interface ComponentRenderer<T> {
  type: MessageComponentType;
  render: (component: MessageComponent<T>) => React.ReactElement;
  canStream: boolean;
  updateStream?: (existing: T, update: Partial<T>) => T;
}
```

## Usage Example

```typescript
// Creating a user message
const userMessage: UserMessage = {
  id: generateId(),
  timestamp: new Date(),
  type: 'user',
  status: MessageStatus.COMPLETED,
  model: AIModel.GPT_4,
  mode: ChatMode.CODER,
  content: "Help me refactor this authentication module",
  attachments: [{
    id: generateId(),
    type: 'code-snippet',
    name: 'auth.ts',
    content: '// ... code content ...',
    metadata: { language: 'typescript' }
  }]
};

// Agent response with components
const agentMessage: AgentMessage = {
  id: generateId(),
  timestamp: new Date(),
  type: 'agent',
  status: MessageStatus.STREAMING,
  model: AIModel.GPT_4,
  mode: ChatMode.CODER,
  agentType: AgentType.CLAUDE_CODE_SDK,
  components: [
    {
      id: generateId(),
      type: MessageComponentType.THINKING,
      timestamp: new Date(),
      status: ComponentStatus.COMPLETED,
      data: {
        content: "Analyzing the authentication module structure...",
        isComplete: true
      }
    },
    {
      id: generateId(),
      type: MessageComponentType.FILE_EDIT,
      timestamp: new Date(),
      status: ComponentStatus.STREAMING,
      data: {
        filePath: '/src/auth/validation.ts',
        operation: 'create',
        language: 'typescript',
        content: '// Validation logic extracted...'
      }
    }
  ]
};
```