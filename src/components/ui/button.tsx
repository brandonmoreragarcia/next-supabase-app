import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Ícono opcional a la izquierda del texto. */
  icon?: ReactNode;
  /** Muestra spinner y deshabilita el botón. El ancho no salta: el spinner reemplaza al ícono. */
  loading?: boolean;
}

const base =
  'inline-flex items-center justify-center gap-1.5 rounded-md font-medium ' +
  'whitespace-nowrap select-none transition-colors duration-100 ' +
  'disabled:pointer-events-none disabled:opacity-50';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-accent-fg hover:bg-accent-hover',
  secondary: 'border border-line-strong bg-raised text-primary hover:bg-hover',
  ghost: 'text-secondary hover:bg-hover hover:text-primary',
  danger: 'border border-danger-border bg-transparent text-danger hover:bg-danger-bg',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-6 px-2 text-xs',
  md: 'h-7 px-3 text-sm',
  lg: 'h-8 px-4 text-base',
};

function Spinner() {
  return (
    <svg
      className="size-3.5 animate-spin"
      viewBox="0 0 16 16"
      fill="none"
      role="status"
      aria-label="Cargando"
    >
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="2" opacity="0.25" />
      <path
        d="M14.5 8A6.5 6.5 0 0 0 8 1.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Button({
  variant = 'secondary',
  size = 'md',
  icon,
  loading = false,
  disabled,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {loading ? <Spinner /> : icon}
      {children}
    </button>
  );
}
