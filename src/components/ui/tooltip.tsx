'use client';

import { useId, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface TooltipProps {
  /** Contenido del tooltip (texto corto; para contenido rico irá Popover). */
  label: string;
  children: ReactNode;
  side?: 'top' | 'bottom';
  className?: string;
}

/**
 * Tooltip CSS-only: aparece con hover y con focus-within, así funciona
 * también navegando con teclado. Se asocia via aria-describedby para que
 * el lector de pantalla lo anuncie aunque nunca se "muestre".
 */
export function Tooltip({ label, children, side = 'top', className }: TooltipProps) {
  const id = useId();

  return (
    <span className={cn('group/tip relative inline-flex', className)}>
      <span aria-describedby={id} className="inline-flex">
        {children}
      </span>
      <span
        id={id}
        role="tooltip"
        className={cn(
          'pointer-events-none absolute left-1/2 z-10 -translate-x-1/2 whitespace-nowrap',
          'rounded-md border border-line bg-raised px-2 py-1 text-xs text-primary shadow-2',
          'opacity-0 transition-opacity duration-100',
          'group-hover/tip:opacity-100 group-focus-within/tip:opacity-100',
          side === 'top' ? 'bottom-full mb-1.5' : 'top-full mt-1.5',
        )}
      >
        {label}
      </span>
    </span>
  );
}
