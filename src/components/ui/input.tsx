import type { ComponentPropsWithRef } from 'react';
import { cn } from '@/lib/cn';

export interface InputProps extends ComponentPropsWithRef<'input'> {
  /** Marca el campo como inválido: borde danger + aria-invalid para lectores. */
  invalid?: boolean;
}

export function Input({ invalid = false, className, ...rest }: InputProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={cn(
        'h-7 w-full rounded-md border border-line-strong bg-surface px-3 text-sm text-primary',
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
