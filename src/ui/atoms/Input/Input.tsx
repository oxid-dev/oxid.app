import { Input as ShadCNInput } from '@/ui/primitives/input';
import { cn } from '@/lib/utils';
import { InputProps } from './Input.types';

const Input = ({ className, error, ...props }: InputProps) => {
  return (
    <div className="w-full">
      <ShadCNInput
        className={cn(
          error && 'border-destructive',
          className
        )}
        aria-invalid={error ? 'true' : undefined}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

Input.displayName = 'Input';

export { Input };