import { ScrollArea as ScrollAreaPrimitive } from '@/ui/primitives/scroll-area';
import { ScrollAreaProps } from './ScrollArea.types';
import { cn } from '@/lib/utils';

const ScrollArea = ({ children, className, ...props }: ScrollAreaProps) => {
  return (
    <ScrollAreaPrimitive className={cn(className)} {...props}>
      {children}
    </ScrollAreaPrimitive>
  );
};

ScrollArea.displayName = 'ScrollArea';

export { ScrollArea };
