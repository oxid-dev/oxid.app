import { useCallback } from 'react';
import { useAgentChatStore } from '../store/agentChatStore';

export const useAgentChat = () => {
  const {
    messages,
    isLoading,
    error,
    addMessage,
    setLoading,
    setError,
    clearChat,
  } = useAgentChatStore();

  // Mock AI response for now
  const mockAIResponse = useCallback(async (userMessage: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Mock responses based on user input
    if (userMessage.toLowerCase().includes('hello')) {
      return "Hello! I'm Oxid, your AI coding assistant. How can I help you today?";
    }
    
    if (userMessage.toLowerCase().includes('help')) {
      return "I can help you with:\n• Code generation and editing\n• Project structure\n• File operations\n• Debugging\n\nWhat would you like to work on?";
    }
    
    if (userMessage.toLowerCase().includes('test')) {
      return "This is a test response from the mock AI. In the future, I'll be powered by real AI models like Claude or GPT!";
    }

    return `I received your message: "${userMessage}". This is a mock response for now. Soon I'll be powered by real AI capabilities!`;
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    try {
      setError(null);
      
      // Add user message
      addMessage(content.trim(), 'user');
      
      // Show loading state
      setLoading(true);
      
      // Get AI response (mock for now)
      const response = await mockAIResponse(content.trim());
      
      // Add AI response
      addMessage(response, 'assistant');
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [addMessage, setLoading, setError, mockAIResponse]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
  };
};