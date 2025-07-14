import { ChatHeader } from '@/features/app-builder/components/ChatPanel/ChatHeader';

const ChatPanel = () => {
  return (
    <div className="h-full bg-background border-r border-border flex flex-col">
      {/* Chat Header with Oxid Branding */}
      <ChatHeader />

      {/* Chat Content Placeholder */}
      <div className="flex-1 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-muted-foreground mb-2">💬</div>
          <p className="text-muted-foreground">
            Chat functionality will be implemented here
          </p>
        </div>
      </div>
    </div>
  );
};

export { ChatPanel };
