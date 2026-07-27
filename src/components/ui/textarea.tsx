import type { ComponentPropsWithRef } from 'react';
import { cn } from '@/lib/cn';

export interface TextareaProps extends ComponentPropsWithRef<'textarea'> {
  invalid?: boolean;
}

export function Textarea({ invalid = false, className, rows = 3, ...rest }: TextareaProps) {
  return (
    <textarea
      rows={rows}
      aria-invalid={invalid || undefined}
      className={cn(
        'w-full resize-y rounded-md border border-line-strong bg-surface px-3 py-1.5 text-sm text-primary',
        'placeholder:text-muted transition-colors duration-100',
        'hover:border-line-hover',
        'disabled:pointer-events-none disabled:bg-raised disabled:text-disabled',
        invalid && 'border-danger-border shadow-[0_0_0_2px_var(--danger-bg)]',
        className,
      )}
      {...rest}
    />
  );
}
