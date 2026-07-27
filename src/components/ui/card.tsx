import type { ComponentPropsWithRef } from 'react';
import { cn } from '@/lib/cn';

export interface CardProps extends ComponentPropsWithRef<'div'> {
  /** Sin padding interno — para listas que manejan el suyo por fila. */
  flush?: boolean;
}

export function Card({ flush = false, className, ...rest }: CardProps) {
  return (
    <div
      className={cn('rounded-lg border border-line bg-surface', !flush && 'p-4', className)}
      {...rest}
    />
  );
}
