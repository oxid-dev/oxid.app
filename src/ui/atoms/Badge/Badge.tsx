import React from 'react';
import { Badge as BadgePrimitive } from '@/ui/primitives/badge';
import { BadgeProps } from './Badge.types';
import { cn } from '@/lib/utils';

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ 
    children, 
    className,
    ...props 
  }, ref) => {

    return (
      <BadgePrimitive
        ref={ref}
        className={cn(className)}
        {...props}
      >
        {children}
      </BadgePrimitive>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };