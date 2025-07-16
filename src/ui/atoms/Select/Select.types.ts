import { ComponentProps } from 'react';
import { Select as SelectPrimitive } from '@/ui/primitives/select';

export interface SelectProps extends 
  ComponentProps<typeof SelectPrimitive> {
  // Additional props for the atom wrapper
  placeholder?: string;
  triggerClassName?: string;
  valueClassName?: string;
  items: { value: string; label: string }[];
  itemClassName?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean;
  // Variant props
  size?: "default" | "sm";
  variant?: "default" | "unstyled";
}