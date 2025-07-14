import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/ui/primitives/resizable';
import { ChatPanel } from '@/features/app-builder/components/ChatPanel';
import { PreviewCodePanel } from '@/features/app-builder/components/PreviewCodePanel';

const AppBuilderPage = () => {
  return (
    <div className="bg-background h-full text-foreground">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={35} minSize={25} maxSize={50}>
          <ChatPanel />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={65} minSize={50}>
          <PreviewCodePanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default AppBuilderPage;