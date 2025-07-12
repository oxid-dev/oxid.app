import { Button as ShadCNButton } from '@/ui/primitives/button';
import { ButtonProps } from './Button.types';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const Button = ({ variant = 'primary', size = 'md', className, children, isLoading, disabled, ...props }: ButtonProps) => {
  // Map our variant names to ShadCN variant names
  const shadCNVariant = {
    primary: 'default',
    secondary: 'secondary', 
    ghost: 'ghost',
    outline: 'outline',
  }[variant] as 'default' | 'secondary' | 'ghost' | 'outline';

  // Map our size names to ShadCN size names
  const shadCNSize = {
    sm: 'sm',
    md: 'default',
    lg: 'lg',
  }[size] as 'sm' | 'default' | 'lg';

  // Determine if button should be disabled
  const isDisabled = disabled || isLoading;

  // Build custom classes for cursor and disabled state
  const customClasses = cn(
    'cursor-pointer',
    // Override ShadCN's disabled:pointer-events-none with our cursor
    isDisabled && 'disabled:pointer-events-auto disabled:cursor-not-allowed',
    className
  );

  return (
    <ShadCNButton
      variant={shadCNVariant}
      size={shadCNSize}
      className={customClasses}
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        children
      )}
    </ShadCNButton>
  );
};

Button.displayName = 'Button';

export { Button };