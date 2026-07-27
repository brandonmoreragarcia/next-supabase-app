import type { ComponentPropsWithRef } from 'react';
import { cn } from '@/lib/cn';
import { buttonBase, buttonVariants, type ButtonSize, type ButtonVariant } from './button';

export interface IconButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Obligatorio: un botón solo-ícono no tiene texto que leer. */
  'aria-label': string;
}

const sizes: Record<ButtonSize, string> = {
  sm: 'size-6 [&_svg]:size-3.5',
  md: 'size-7 [&_svg]:size-4',
  lg: 'size-8 [&_svg]:size-[18px]',
};

export function IconButton({
  variant = 'ghost',
  size = 'md',
  className,
  children,
  type = 'button',
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonBase, buttonVariants[variant], sizes[size], 'px-0', className)}
      {...rest}
    >
      {children}
    </button>
  );
}
