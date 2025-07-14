import { ReactNode } from 'react';

export interface ResizableContainerProps {
  leftPanel: ReactNode;
  rightPanel: ReactNode;
  defaultSplit?: number; // Percentage for left panel (0-100)
  minLeftWidth?: number; // Minimum width in pixels
  minRightWidth?: number; // Minimum width in pixels
  className?: string;
}