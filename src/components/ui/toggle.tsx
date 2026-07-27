import type { ComponentPropsWithRef } from 'react';
import { cn } from '@/lib/cn';

export type ToggleProps = ComponentPropsWithRef<'input'>;

/**
 * Interruptor on/off. Mismo truco que Checkbox: un input[type=checkbox]
 * invisible mantiene la semántica (role switch vía aria) y la pista +
 * perilla son puro CSS sobre :checked.
 */
export function Toggle({ className, ...rest }: ToggleProps) {
  return (
    <span className="relative inline-flex h-4 w-7 shrink-0">
      <input
        type="checkbox"
        role="switch"
        className={cn(
          'peer absolute inset-0 cursor-pointer appearance-none rounded-full',
          className,
        )}
        {...rest}
      />
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 rounded-full border border-line-strong bg-raised',
          'transition-colors duration-100',
          'peer-hover:border-line-hover',
          'peer-checked:border-accent peer-checked:bg-accent',
          'peer-disabled:border-line peer-disabled:bg-raised',
          'peer-focus-visible:shadow-[0_0_0_2px_var(--focus-ring)]',
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute left-[2px] top-1/2 size-3 -translate-y-1/2 rounded-full',
          'bg-white shadow-1 transition-transform duration-100',
          'peer-checked:translate-x-3',
          'peer-disabled:bg-line-strong',
        )}
      />
    </span>
  );
}
