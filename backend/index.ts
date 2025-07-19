import * as chatControllers from '#backend/resources/chat';

/**
 * Main backend client
 * Runs in WebView process (same as UI)
 * Provides single interface for all backend operations
 */
export const backend = {
  chat: {
    // Local operations using Tauri APIs
    sendMessage: chatControllers.sendMessage,
    
    // TODO: Add more chat operations
    // getMessages: chatControllers.getMessages,
    // deleteMessage: chatControllers.deleteMessage,
  },
  
  // TODO: Add other resources
  // project: { ... },
  // file: { ... },
  
  // Agent operations (will use Node.js sidecar)
  agent: {
    async processMessage(content: string) {
      // TODO: Implement IPC call to Node.js sidecar
      // return invoke('claude_process', { message: content });
      
      // For now, return hardcoded response
      return {
        id: 'response-' + Date.now(),
        content: `Echo: ${content}`,
        role: 'assistant' as const,
        createdAt: new Date()
      };
    }
  }
};

// TODO: Add auth token management
// export const setAuthToken = (token: string | null) => {
//   authToken = token;
//   httpClient.setAuthToken(token);
// };