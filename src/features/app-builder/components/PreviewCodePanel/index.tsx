import { useState } from "react";
import { PreviewCodePanelHeader } from "@/features/app-builder/components/PreviewCodePanel/PreviewCodePanelHeader";

const PreviewContent = () => (
  <div className="h-full p-4 flex items-center justify-center bg-background">
    <div className="text-center">
      <div className="text-muted-foreground mb-2">🖥️</div>
      <p className="text-muted-foreground">
        Preview content will be displayed here
      </p>
    </div>
  </div>
);

const CodeContent = () => (
  <div className="h-full p-4 flex items-center justify-center bg-background">
    <div className="text-center">
      <div className="text-muted-foreground mb-2">📝</div>
      <p className="text-muted-foreground">
        Code editor will be implemented here
      </p>
    </div>
  </div>
);

const PreviewCodePanel = () => {
  const [activeTab, setActiveTab] = useState('preview');

  return (
    <div className="h-full flex flex-col">
      {/* Header with Tabs */}
      <PreviewCodePanelHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'preview' && (
          <PreviewContent />
        )}

        {activeTab === 'code' && (
          <CodeContent />
        )}
      </div>
    </div>
  );
};

export { PreviewCodePanel };
