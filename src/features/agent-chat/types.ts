import { ID, Timestamp } from '@/types';

export interface Message {
  id: ID;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Timestamp;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export interface ChatActions {
  addMessage: (content: string, role: 'user' | 'assistant') => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearChat: () => void;
}