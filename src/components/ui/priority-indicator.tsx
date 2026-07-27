import { cn } from '@/lib/cn';

/** Prioridades del issue. En la Fase 3 este tipo saldrá de database.types.ts. */
export type IssuePriority = 'none' | 'low' | 'medium' | 'high' | 'urgent';

export const priorityLabels: Record<IssuePriority, string> = {
  none: 'Sin prioridad',
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
  urgent: 'Urgente',
};

const filledBars: Record<Exclude<IssuePriority, 'urgent'>, number> = {
  none: 0,
  low: 1,
  medium: 2,
  high: 3,
};

export interface PriorityIndicatorProps {
  priority: IssuePriority;
  /** Agrega la etiqueta de texto al lado del ícono. */
  withLabel?: boolean;
  className?: string;
}

/**
 * Barras tipo señal para none→high; urgente rompe el patrón a propósito
 * (cuadrado danger con !): tiene que gritar aunque no distingas colores.
 */
export function PriorityIndicator({
  priority,
  withLabel = false,
  className,
}: PriorityIndicatorProps) {
  const label = priorityLabels[priority];

  const icon =
    priority === 'urgent' ? (
      <svg viewBox="0 0 14 14" aria-hidden="true" className="size-3.5 shrink-0">
        <rect
          x="1"
          y="1"
          width="12"
          height="12"
          rx="3"
          fill="var(--danger-bg)"
          stroke="var(--priority-urgent)"
          strokeWidth="1.5"
        />
        <path
          d="M7 4v3.4M7 9.8v.4"
          stroke="var(--priority-urgent)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ) : (
      <span aria-hidden="true" className="inline-flex items-end gap-[1.5px]">
        {[0, 1, 2].map((bar) => (
          <span
            key={bar}
            className="w-[3px] rounded-[1px]"
            style={{
              height: `${5 + bar * 3}px`,
              background: bar < filledBars[priority] ? 'var(--priority-fg)' : 'var(--priority-off)',
            }}
          />
        ))}
      </span>
    );

  return (
    <span
      title={withLabel ? undefined : label}
      className={cn(
        'inline-flex items-center gap-1.5 text-sm',
        priority === 'urgent' ? 'text-danger' : 'text-secondary',
        className,
      )}
    >
      {icon}
      {withLabel ? label : <span className="sr-only">{label}</span>}
    </span>
  );
}
