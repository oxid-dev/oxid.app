import { ComponentProps } from 'react';
import { Badge as BadgePrimitive } from '@/ui/primitives/badge';
import { VariantProps } from 'class-variance-authority';

export interface BadgeProps extends 
  ComponentProps<typeof BadgePrimitive>,
  VariantProps<typeof BadgePrimitive> {
  // Additional props for the atom wrapper
}