import { Badge as BadgePrimitive } from '@/ui/primitives/badge';
import { BadgeProps } from './Badge.types';
import { cn } from '@/lib/utils';

const Badge = ({ children, className, ...props }: BadgeProps) => {
  return (
    <BadgePrimitive className={cn(className)} {...props}>
      {children}
    </BadgePrimitive>
  );
};

Badge.displayName = 'Badge';

export { Badge };
