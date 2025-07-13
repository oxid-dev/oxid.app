import { Outlet, useLocation } from 'react-router-dom';
import { AppLayoutProps } from './AppLayout.types';
import { Button } from '@/ui/atoms';
import { useAgentChatStore } from '@/features/agent-chat/store/agentChatStore';

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const isChat = location.pathname === '/chat' || location.pathname === '/';
  
  // Access chat store directly
  const { messages, clearChat } = useAgentChatStore();

  return (
    <div className="h-screen w-screen bg-background text-foreground flex flex-col overflow-hidden">
      {/* Header */}
      <header className="border-b border-border px-6 py-3 flex items-center justify-between bg-card/95 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <h1 className="text-lg font-semibold">Oxid Agent</h1>
          <p className="text-sm text-muted-foreground">Your AI coding assistant</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {isChat && messages.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearChat}
            >
              Clear Chat
            </Button>
          )}
        </div>
      </header>
      
      {/* Main content area */}
      <main className="flex-1 overflow-hidden">
        {children || <Outlet />}
      </main>
    </div>
  );
};

export { AppLayout };