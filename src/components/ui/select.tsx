import type { ComponentPropsWithRef } from 'react';
import { cn } from '@/lib/cn';

export interface SelectProps extends ComponentPropsWithRef<'select'> {
  invalid?: boolean;
}

/**
 * Select nativo estilizado. Para la Fase 1 alcanza: cuando necesitemos
 * búsqueda o multi-selección (filtros del tablero) haremos un combobox
 * sobre Popover — no antes de tenerlo diseñado.
 */
export function Select({ invalid = false, className, children, ...rest }: SelectProps) {
  return (
    <span className={cn('relative inline-flex w-full', className)}>
      <select
        aria-invalid={invalid || undefined}
        className={cn(
          'h-7 w-full appearance-none rounded-md border border-line-strong bg-surface pl-3 pr-8 text-sm text-primary',
          'transition-colors duration-100 hover:border-line-hover',
          'disabled:pointer-events-none disabled:bg-raised disabled:text-disabled',
          invalid && 'border-danger-border shadow-[0_0_0_2px_var(--danger-bg)]',
        )}
        {...rest}
      >
        {children}
      </select>
      <svg
        viewBox="0 0 16 16"
        aria-hidden="true"
        className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted"
      >
        <path
          d="M4 6l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
