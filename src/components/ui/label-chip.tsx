import { cn } from '@/lib/cn';

export interface LabelChipProps {
  name: string;
  /**
   * Color de la etiqueta (hex de la base). El chip lo usa como punto de
   * color y deja el texto en tokens del sistema: legible en ambos temas
   * sin calcular contrastes por etiqueta.
   */
  color: string;
  className?: string;
}

export function LabelChip({ name, color, className }: LabelChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-0.5 text-xs text-secondary',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="size-2 shrink-0 rounded-full"
        style={{ background: color }}
      />
      {name}
    </span>
  );
}
