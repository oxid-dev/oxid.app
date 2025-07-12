import { forwardRef, useEffect, useRef } from 'react';
import { Textarea as ShadCNTextarea } from '@/ui/primitives/textarea';
import { cn } from '@/lib/utils';
import { TextAreaProps } from './TextArea.types';

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, error, autoResize = false, ...props }, ref) => {
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const textareaRef = ref || internalRef;

    useEffect(() => {
      if (autoResize && textareaRef && 'current' in textareaRef && textareaRef.current) {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }, [props.value, autoResize, textareaRef]);

    return (
      <div className="w-full">
        <ShadCNTextarea
          ref={textareaRef}
          className={cn(
            autoResize && 'resize-none overflow-hidden',
            error && 'border-destructive',
            className
          )}
          aria-invalid={error ? 'true' : undefined}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export { TextArea };