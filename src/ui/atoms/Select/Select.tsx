import {
  SelectContent,
  SelectItem,
  Select as SelectPrimitive,
  SelectTrigger,
  SelectValue,
} from '@/ui/primitives/select';
import { SelectProps } from './Select.types';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const selectTriggerVariants = cva(
  "",
  {
    variants: {
      variant: {
        default: "cursor-pointer text-xs text-muted-foreground !h-5 !py-0.5 !px-1 min-h-0 border-0 bg-foreground/5 hover:bg-foreground/10 hover:text-foreground transition-colors rounded-sm font-medium [&_svg]:!size-3 gap-1",
        unstyled: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const selectValueVariants = cva("", {
  variants: {
    variant: {
      default: "cursor-pointer text-xs leading-none",
      unstyled: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const selectItemVariants = cva("", {
  variants: {
    variant: {
      default: "cursor-pointer text-xs",
      unstyled: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const Select = ({
  placeholder,
  triggerClassName,
  valueClassName,
  children,
  items,
  itemClassName,
  value,
  onValueChange,
  defaultValue,
  disabled,
  size,
  variant = "default",
}: SelectProps) => {
  return (
    <SelectPrimitive value={value} onValueChange={onValueChange} defaultValue={defaultValue} disabled={disabled}>
      <SelectTrigger 
        className={cn(selectTriggerVariants({ variant }), triggerClassName)}
        size={size}
      >
        {children ? (
          children
        ) : (
          <SelectValue 
            placeholder={placeholder} 
            className={cn(selectValueVariants({ variant }), valueClassName)} 
          />
        )}
      </SelectTrigger>
      <SelectContent>
        {items.map((item: { value: string; label: string }) => (
          <SelectItem 
            key={item.value} 
            value={item.value} 
            className={cn(selectItemVariants({ variant }), itemClassName)}
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectPrimitive>
  );
};

Select.displayName = 'Select';

export { Select };
