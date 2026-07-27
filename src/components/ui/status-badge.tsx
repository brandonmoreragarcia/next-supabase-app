import { cn } from '@/lib/cn';

/** Estados del issue. En la Fase 3 este tipo saldrá de database.types.ts. */
export type IssueStatus = 'backlog' | 'todo' | 'in_progress' | 'done' | 'canceled';

export const statusLabels: Record<IssueStatus, string> = {
  backlog: 'Backlog',
  todo: 'Todo',
  in_progress: 'In progress',
  done: 'Done',
  canceled: 'Canceled',
};

/**
 * Ícono de estado: cada uno tiene FORMA propia (punteado, vacío, medio,
 * check, x) además de color — distinguibles con daltonismo.
 */
export function StatusIcon({ status, className }: { status: IssueStatus; className?: string }) {
  const common = cn('size-3.5 shrink-0', className);
  switch (status) {
    case 'backlog':
      return (
        <svg viewBox="0 0 14 14" aria-hidden="true" className={common}>
          <circle
            cx="7"
            cy="7"
            r="5.5"
            fill="none"
            stroke="var(--status-backlog)"
            strokeWidth="1.5"
            strokeDasharray="2.2 2.2"
          />
        </svg>
      );
    case 'todo':
      return (
        <svg viewBox="0 0 14 14" aria-hidden="true" className={common}>
          <circle cx="7" cy="7" r="5.5" fill="none" stroke="var(--status-todo)" strokeWidth="1.5" />
        </svg>
      );
    case 'in_progress':
      return (
        <svg viewBox="0 0 14 14" aria-hidden="true" className={common}>
          <circle
            cx="7"
            cy="7"
            r="5.5"
            fill="none"
            stroke="var(--status-in-progress)"
            strokeWidth="1.5"
          />
          <path d="M7 7V1.5A5.5 5.5 0 0 1 7 12.5z" fill="var(--status-in-progress)" />
        </svg>
      );
    case 'done':
      return (
        <svg viewBox="0 0 14 14" aria-hidden="true" className={common}>
          <circle cx="7" cy="7" r="6.25" fill="var(--status-done)" />
          <path
            d="M4.4 7.2l1.9 1.9 3.4-3.9"
            stroke="var(--bg-surface)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'canceled':
      return (
        <svg viewBox="0 0 14 14" aria-hidden="true" className={common}>
          <circle
            cx="7"
            cy="7"
            r="5.5"
            fill="none"
            stroke="var(--status-canceled)"
            strokeWidth="1.5"
          />
          <path
            d="M4.9 4.9l4.2 4.2M9.1 4.9l-4.2 4.2"
            stroke="var(--status-canceled)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

export interface StatusBadgeProps {
  status: IssueStatus;
  /** Solo el ícono, sin texto — para filas densas. */
  iconOnly?: boolean;
  className?: string;
}

export function StatusBadge({ status, iconOnly = false, className }: StatusBadgeProps) {
  if (iconOnly) {
    return (
      <span title={statusLabels[status]} className={className}>
        <StatusIcon status={status} />
        <span className="sr-only">{statusLabels[status]}</span>
      </span>
    );
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-0.5 text-xs text-secondary',
        className,
      )}
    >
      <StatusIcon status={status} />
      {statusLabels[status]}
    </span>
  );
}
