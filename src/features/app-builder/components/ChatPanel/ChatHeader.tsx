import { Sparkles, Zap, PanelLeftOpen } from 'lucide-react';
import { Button, Badge } from '@/ui/atoms';

const ChatHeader = () => {
  return (
    <div className="border-b border-border p-3">
      <div className="flex items-center gap-2 mb-2">
        {/* Collapsible Sidebar Navigation */}
        <Button variant="ghost" size="sm" onClick={() => {}} className="p-1">
          <PanelLeftOpen className="h-3 w-3" />
        </Button>

        {/* Oxid Branding */}
        <div className="flex items-center gap-2 flex-1">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-brand-gradient-start to-brand-gradient-end flex items-center justify-center">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold bg-gradient-to-r from-brand-foreground-gradient-start to-brand-foreground-gradient-end bg-clip-text text-transparent">
              Oxid
            </h1>
            <p className="text-xs text-foreground-subtle">AI App Builder</p>
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="flex items-center gap-2">
        <h2 className="text-sm font-semibold text-foreground">
          Task Management App
        </h2>
        <Badge
          variant="secondary"
          className="bg-primary/10 text-primary border-primary/20 text-xs h-4"
        >
          <Sparkles className="h-2 w-2 mr-1" />
          Building
        </Badge>
      </div>
    </div>
  );
};

export { ChatHeader };
