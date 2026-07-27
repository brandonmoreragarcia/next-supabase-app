'use client';

import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { IconButton } from './icon-button';

export interface ModalProps {
  open: boolean;
  /** Se dispara al cerrar por Esc, click en el fondo o el botón ×. */
  onClose: () => void;
  title: string;
  children: ReactNode;
  /** Zona de acciones (botones) al pie. */
  footer?: ReactNode;
  className?: string;
}

/**
 * Sobre <dialog> nativo: showModal() nos da gratis el focus trap, la capa
 * top-layer (nada de z-index en guerra), Esc para cerrar y ::backdrop.
 * React solo sincroniza la prop `open` con el estado imperativo del DOM.
 */
export function Modal({ open, onClose, title, children, footer, className }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function onBackdropClick(e: MouseEvent<HTMLDialogElement>) {
    if (e.target === ref.current) onClose();
  }

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={onBackdropClick}
      className={cn(
        'm-auto w-full max-w-md rounded-lg border border-line bg-surface p-0 text-primary shadow-3',
        'backdrop:bg-black/50',
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <h2 className="text-lg font-medium">{title}</h2>
        <IconButton aria-label="Cerrar" onClick={onClose}>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M4 4l8 8M12 4l-8 8"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
        </IconButton>
      </div>
      <div className="px-4 py-3">{children}</div>
      {footer ? (
        <div className="flex justify-end gap-2 border-t border-line px-4 py-3">{footer}</div>
      ) : null}
    </dialog>
  );
}
