/* eslint-disable @next/next/no-img-element -- avatares: URLs externas de
   Supabase Storage, tamaño fijo diminuto; next/image no aporta acá. */
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps {
  /** Nombre completo: genera las iniciales del fallback y el title. */
  name: string;
  src?: string | null;
  size?: AvatarSize;
  className?: string;
}

const sizes: Record<AvatarSize, string> = {
  sm: 'size-4.5 text-[9px]',
  md: 'size-6 text-2xs',
  lg: 'size-8 text-xs',
};

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '?';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  return (
    <span
      title={name}
      className={cn(
        'relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full',
        'border border-line bg-raised font-medium text-secondary',
        sizes[size],
        className,
      )}
    >
      {initials(name)}
      {src ? (
        <img src={src} alt="" className="absolute inset-0 size-full rounded-full object-cover" />
      ) : null}
    </span>
  );
}

export interface AvatarGroupProps {
  children: ReactNode;
  /** Cuántos avatares se muestran antes del contador +N. */
  max?: number;
  size?: AvatarSize;
  className?: string;
}

export function AvatarGroup({ children, max = 3, size = 'md', className }: AvatarGroupProps) {
  const items = Array.isArray(children) ? children : [children];
  const visible = items.slice(0, max);
  const rest = items.length - visible.length;

  return (
    <span className={cn('inline-flex items-center -space-x-1.5', className)}>
      {visible.map((child, i) => (
        <span key={i} className="rounded-full ring-2 ring-[var(--bg-surface)]">
          {child}
        </span>
      ))}
      {rest > 0 ? (
        <span
          className={cn(
            'relative inline-flex shrink-0 items-center justify-center rounded-full',
            'border border-line bg-raised font-medium text-muted ring-2 ring-[var(--bg-surface)]',
            sizes[size],
          )}
        >
          +{rest}
        </span>
      ) : null}
    </span>
  );
}
