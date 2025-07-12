export interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date | string;
  className?: string;
}