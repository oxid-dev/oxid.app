import { ReactNode } from 'react';

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  autoResize?: boolean;
  variant?: 'default' | 'withFooter';
  footerContent?: ReactNode;
}