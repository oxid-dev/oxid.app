import { ComponentSize, ComponentVariant } from '@/types';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ComponentVariant;
  size?: ComponentSize;
  children: React.ReactNode;
  isLoading?: boolean;
}