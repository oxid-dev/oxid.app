import { ChatHeader } from '@/features/app-builder/components/ChatPanel/ChatHeader';
import { ScrollArea } from '@/ui/atoms';
import { ChatFooter } from '@/features/app-builder/components/ChatPanel/ChatFooter';

const ChatPanel = () => {
  return (
    <div className="h-full bg-background border-r border-border flex flex-col">
      {/* Chat Header with Oxid Branding */}
      <ChatHeader />

      {/* Chat Content Placeholder */}
      <ScrollArea className="flex-1 p-3">
        <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-muted-foreground mb-2">💬</div>
          <p className="text-muted-foreground">
            Chat functionality will be implemented here
          </p>
        </div>
        </div>
      </ScrollArea>
      <ChatFooter />
    </div>
  );
};

export { ChatPanel };
