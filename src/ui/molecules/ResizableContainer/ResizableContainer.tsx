import React, { useState, useRef, useCallback } from 'react';
import { ResizableContainerProps } from './ResizableContainer.types';

const ResizableContainer = ({ 
  leftPanel, 
  rightPanel, 
  defaultSplit = 50, 
  minLeftWidth = 200, 
  minRightWidth = 200,
  className = ''
}: ResizableContainerProps) => {
  const [leftWidth, setLeftWidth] = useState(defaultSplit);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const mouseX = e.clientX - containerRect.left;
    
    // Calculate new left width as percentage
    const newLeftWidthPx = Math.max(minLeftWidth, Math.min(mouseX, containerWidth - minRightWidth));
    const newLeftWidthPercent = (newLeftWidthPx / containerWidth) * 100;
    
    setLeftWidth(newLeftWidthPercent);
  }, [isDragging, minLeftWidth, minRightWidth]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add global mouse event listeners when dragging
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div 
      ref={containerRef}
      className={`flex h-full ${className}`}
    >
      {/* Left Panel */}
      <div 
        className="flex-shrink-0 overflow-hidden"
        style={{ width: `${leftWidth}%` }}
      >
        {leftPanel}
      </div>
      
      {/* Resize Handle */}
      <div 
        className={`w-1 bg-border hover:bg-accent cursor-col-resize flex-shrink-0 ${
          isDragging ? 'bg-accent' : ''
        }`}
        onMouseDown={handleMouseDown}
      />
      
      {/* Right Panel */}
      <div className="flex-1 overflow-hidden">
        {rightPanel}
      </div>
    </div>
  );
};

export { ResizableContainer };