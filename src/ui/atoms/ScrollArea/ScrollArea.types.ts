import { ComponentProps } from 'react';
import { ScrollArea as ScrollAreaPrimitive } from '@/ui/primitives/scroll-area';
import { VariantProps } from 'class-variance-authority';

export interface ScrollAreaProps extends 
  ComponentProps<typeof ScrollAreaPrimitive>,
  VariantProps<typeof ScrollAreaPrimitive> {
  // Additional props for the atom wrapper
}