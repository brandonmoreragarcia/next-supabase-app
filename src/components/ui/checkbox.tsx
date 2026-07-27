import type { ComponentPropsWithRef } from 'react';
import { cn } from '@/lib/cn';

export type CheckboxProps = ComponentPropsWithRef<'input'>;

/**
 * Checkbox nativo con caja dibujada encima: el input real queda invisible
 * pero presente, así el teclado, los formularios y los lectores de pantalla
 * funcionan gratis. El check es un pseudo-elemento que aparece con :checked.
 */
export function Checkbox({ className, ...rest }: CheckboxProps) {
  return (
    <span className="relative inline-flex size-4 shrink-0">
      <input
        type="checkbox"
        className={cn('peer absolute inset-0 cursor-pointer appearance-none rounded-sm', className)}
        {...rest}
      />
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 rounded-sm border border-line-strong bg-surface',
          'transition-colors duration-100 peer-hover:border-line-hover',
          'peer-checked:border-accent peer-checked:bg-accent',
          'peer-disabled:border-line peer-disabled:bg-raised',
          'peer-focus-visible:shadow-[0_0_0_2px_var(--focus-ring)]',
        )}
      />
      <svg
        viewBox="0 0 16 16"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-4 scale-75 opacity-0 transition-opacity duration-100 peer-checked:opacity-100"
      >
        <path
          d="M3.8 8.4l2.7 2.7 5.7-6.2"
          stroke="var(--accent-fg)"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
