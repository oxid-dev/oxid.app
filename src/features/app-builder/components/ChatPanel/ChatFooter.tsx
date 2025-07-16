import { Button, TextArea, Select } from '@/ui/atoms';
import { Paperclip, Send } from 'lucide-react';
import { useState } from 'react';

const modeItems = [
  { value: 'planner', label: 'Planner' },
  { value: 'coder', label: 'Coder' },
];
const modelItems = [
  { value: 'gpt-4', label: 'GPT-4' },
  { value: 'gpt-3.5', label: 'GPT-3.5' },
  { value: 'claude', label: 'Claude' },
];
const ChatFooter = () => {
  const [inputValue, setInputValue] = useState('');
  return (
    <div className="border-t border-zinc-800 px-3 py-2">
      <div className="relative">
        <TextArea
          placeholder="Describe what you want to build or modify..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="bg-zinc-800 border-zinc-700 text-zinc-200 placeholder-zinc-500 resize-none pr-32 text-sm min-h-[100px]"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              //   sendMessage();
            }
          }}
        />

        {/* Textarea Controls */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
            <Paperclip className="h-3 w-3 text-zinc-400" />
          </Button>
          <Select value={'planner'} items={modeItems} />
          <Select value={'gpt-4'} items={modelItems} />
        </div>
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-foreground-subtle">
          ⏎ Send • ⇧⏎ New line
        </div>
        <Button onClick={() => {}} size="sm" className="bg-primary">
          <Send className="h-3 w-3 mr-1" />
          Send
        </Button>
      </div>
    </div>
  );
};

export { ChatFooter };
