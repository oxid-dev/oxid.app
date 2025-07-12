import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
  className?: string;
}

export const ThemeToggle = ({ isDark, onToggle, className }: ThemeToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'relative inline-flex h-4 w-8 items-center rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        isDark 
          ? 'bg-indigo-900/40 hover:bg-indigo-900/60' 
          : 'bg-yellow-200 hover:bg-yellow-300',
        className
      )}
      style={{
        boxShadow: isDark 
          ? 'inset 0 2px 4px rgba(0, 0, 0, 0.6), inset 0 -1px 2px rgba(255, 255, 255, 0.1)'
          : 'inset 0 2px 4px rgba(0, 0, 0, 0.3), inset 0 -1px 2px rgba(255, 255, 255, 0.8)'
      }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Track background with gradient */}
      <div className={cn(
        'absolute inset-0 rounded-full transition-colors duration-300',
        isDark
          ? 'bg-gradient-to-r from-indigo-900/50 to-purple-900/50'
          : 'bg-gradient-to-r from-yellow-300 to-yellow-200'
      )} />
      
      {/* Stars for dark mode - positioned on the left side to avoid moon */}
      {isDark && (
        <div className="absolute inset-0 overflow-hidden rounded-full">
          {/* Small stars scattered on the left side */}
          <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
          <div className="absolute top-2 left-1 w-0.5 h-0.5 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-0.5 left-1 w-0.5 h-0.5 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
      )}
      
      {/* Toggle button */}
      <div
        className={cn(
          'relative z-10 inline-flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300 ease-in-out',
          isDark 
            ? 'translate-x-3 bg-gradient-to-br from-purple-400 to-indigo-500' 
            : '-translate-x-1 bg-orange-400 hover:bg-orange-500'
        )}
        style={{
          boxShadow: isDark
            ? '0 4px 12px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(138, 43, 226, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            : '0 4px 12px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(255, 140, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
        }}
      >
        {isDark ? (
          <Moon className="h-4 w-4 text-white" />
        ) : (
          <Sun className="h-3 w-3 text-white" />
        )}
      </div>
    </button>
  );
};