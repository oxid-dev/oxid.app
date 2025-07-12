import { cn } from '@/lib/utils';
import { MessageBubbleProps } from './MessageBubble.types';

const MessageBubble = ({ role, content, timestamp, className }: MessageBubbleProps) => {
  const isUser = role === 'user';
  
  const formatTimestamp = (ts?: Date | string) => {
    if (!ts) return '';
    const date = typeof ts === 'string' ? new Date(ts) : ts;
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className={cn(
      'flex w-full',
      isUser ? 'justify-end' : 'justify-start',
      className
    )}>
      <div className={cn(
        'max-w-[80%] rounded-lg px-4 py-2 text-sm',
        isUser 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-800 text-gray-100 border border-gray-700'
      )}>
        <div className="whitespace-pre-wrap break-words">
          {content}
        </div>
        {timestamp && (
          <div className={cn(
            'mt-1 text-xs opacity-70',
            isUser ? 'text-blue-100' : 'text-gray-400'
          )}>
            {formatTimestamp(timestamp)}
          </div>
        )}
      </div>
    </div>
  );
};

export { MessageBubble };