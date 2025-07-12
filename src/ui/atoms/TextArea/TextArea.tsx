import { forwardRef, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { TextAreaProps } from './TextArea.types';

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, error, autoResize = false, ...props }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const combinedRef = ref || textareaRef;

    useEffect(() => {
      if (autoResize && combinedRef && 'current' in combinedRef && combinedRef.current) {
        const textarea = combinedRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }, [props.value, autoResize, combinedRef]);

    return (
      <div className="w-full">
        <textarea
          ref={combinedRef}
          className={cn(
            'flex min-h-[80px] w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 resize-none',
            error && 'border-red-500 focus:ring-red-500',
            autoResize && 'overflow-hidden',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export { TextArea };