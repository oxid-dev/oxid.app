import { create } from 'zustand';
import { ChatState, ChatActions, Message } from '@/features/agent-chat/types';

type AgentChatStore = ChatState & ChatActions;

export const useAgentChatStore = create<AgentChatStore>((set) => ({
  // Initial state
  messages: [],
  isLoading: false,
  error: null,

  // Actions
  addMessage: (content: string, role: 'user' | 'assistant') => {
    const newMessage: Message = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      role,
      content,
      timestamp: new Date(),
    };

    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  clearChat: () => {
    set({
      messages: [],
      isLoading: false,
      error: null,
    });
  },
}));