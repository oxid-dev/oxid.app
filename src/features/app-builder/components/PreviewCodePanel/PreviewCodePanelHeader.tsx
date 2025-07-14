import { Button } from '@/ui/atoms';
import { Eye, Code, Share2, Download } from 'lucide-react';

const PreviewCodePanelHeader = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
  return (
    <header className="border-b border-border px-3 py-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Main Tabs */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-md p-0.5 flex">
          <Button
            variant={activeTab === 'preview' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('preview')}
            className="h-6 px-3 text-xs flex items-center gap-1.5"
          >
            <Eye className="h-3 w-3" />
            Preview
          </Button>
          <Button
            variant={activeTab === 'code' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('code')}
            className="h-6 px-3 text-xs flex items-center gap-1.5"
          >
            <Code className="h-3 w-3" />
            Code
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
          <Share2 className="h-3 w-3 mr-1" />
          Share
        </Button>
        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
          <Download className="h-3 w-3 mr-1" />
          Export
        </Button>
      </div>
    </header>
  );
};

export { PreviewCodePanelHeader };
