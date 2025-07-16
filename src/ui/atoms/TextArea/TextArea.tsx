import { forwardRef, useEffect, useRef } from 'react';
import { Textarea as ShadCNTextarea } from '@/ui/primitives/textarea';
import { cn } from '@/lib/utils';
import { TextAreaProps } from './TextArea.types';

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, error, autoResize = false, variant = 'default', footerContent, ...props }, ref) => {
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const textareaRef = ref || internalRef;

    useEffect(() => {
      if (autoResize && textareaRef && 'current' in textareaRef && textareaRef.current) {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }, [props.value, autoResize, textareaRef]);

    if (variant === 'withFooter') {
      return (
        <div className="w-full">
          <div className="relative rounded-md border border-input focus-within:ring-[3px] focus-within:ring-ring/50 focus-within:ring-offset-0 overflow-hidden">
            {/* TextArea without any borders */}
            <ShadCNTextarea
              ref={textareaRef}
              className={cn(
                autoResize && 'resize-none overflow-hidden',
                error && 'border-destructive',
                'border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0',
                className
              )}
              aria-invalid={error ? 'true' : undefined}
              {...props}
            />
            
            {/* Footer container without borders */}
            {footerContent && (
              <div className="bg-input/30 px-2 pt-1 pb-2">
                {footerContent}
              </div>
            )}
          </div>
          {error && (
            <p className="mt-1 text-sm text-destructive">{error}</p>
          )}
        </div>
      );
    }

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