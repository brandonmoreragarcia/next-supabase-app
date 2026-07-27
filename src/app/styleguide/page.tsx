import type { Metadata } from 'next';
import { ThemeToggle } from './theme-toggle';

export const metadata: Metadata = {
  title: 'Styleguide — Tracker',
};

const neutrals = Array.from({ length: 11 }, (_, i) => i + 1);

const semantics = [
  { name: 'accent', fg: 'var(--accent-text)', bg: 'var(--accent-bg)', border: 'var(--accent)' },
  {
    name: 'success',
    fg: 'var(--success-text)',
    bg: 'var(--success-bg)',
    border: 'var(--success-border)',
  },
  {
    name: 'warning',
    fg: 'var(--warning-text)',
    bg: 'var(--warning-bg)',
    border: 'var(--warning-border)',
  },
  {
    name: 'danger',
    fg: 'var(--danger-text)',
    bg: 'var(--danger-bg)',
    border: 'var(--danger-border)',
  },
  { name: 'info', fg: 'var(--info-text)', bg: 'var(--info-bg)', border: 'var(--info-border)' },
];

const typeScale = [
  { cls: 'text-2xs', px: '11px', use: 'metadatos, contadores' },
  { cls: 'text-xs', px: '12px', use: 'badges, labels' },
  { cls: 'text-sm', px: '13px', use: 'cuerpo denso (default)' },
  { cls: 'text-base', px: '14px', use: 'formularios' },
  { cls: 'text-lg', px: '16px', use: 'títulos de sección' },
  { cls: 'text-xl', px: '20px', use: 'títulos de página' },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-3 text-lg font-medium text-primary">{title}</h2>
      {children}
    </section>
  );
}

export default function StyleguidePage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-10">
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-medium text-primary">Styleguide</h1>
          <p className="text-sm text-secondary">
            Sistema de diseño del tracker — tokens y componentes en todos sus estados.
          </p>
        </div>
        <ThemeToggle />
      </header>

      <Section title="Escala neutra">
        <div className="flex gap-1">
          {neutrals.map((n) => (
            <div key={n} className="flex-1">
              <div
                className="h-9 rounded-sm border border-line"
                style={{ background: `var(--neutral-${n})` }}
              />
              <div className="mt-1 text-center font-mono text-2xs text-muted">{n}</div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted">
          1 = fondo de app, 11 = texto más fuerte. La escala se invierte entre temas: un componente
          que usa neutral-8 tiene el mismo contraste en claro y oscuro.
        </p>
      </Section>

      <Section title="Roles semánticos">
        <div className="flex flex-wrap gap-2">
          {semantics.map((s) => (
            <span
              key={s.name}
              className="rounded-md border px-3 py-1.5 text-xs"
              style={{ color: s.fg, background: s.bg, borderColor: s.border }}
            >
              {s.name}
            </span>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted">
          Cada rol define texto + fondo + borde por tema. El acento se reserva para acción primaria,
          foco y selección.
        </p>
      </Section>

      <Section title="Estados de issue">
        <div className="flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-2 text-sm text-secondary">
            <span
              className="size-[9px] rounded-full border-[1.5px] border-dashed"
              style={{ borderColor: 'var(--status-backlog)' }}
            />
            Backlog
          </span>
          <span className="inline-flex items-center gap-2 text-sm text-secondary">
            <span
              className="size-[9px] rounded-full border-[1.5px]"
              style={{ borderColor: 'var(--status-todo)' }}
            />
            Todo
          </span>
          <span className="inline-flex items-center gap-2 text-sm text-secondary">
            <span
              className="size-[9px] rounded-full border-[1.5px]"
              style={{
                borderColor: 'var(--status-in-progress)',
                background: `linear-gradient(90deg, var(--status-in-progress) 50%, transparent 50%)`,
              }}
            />
            In progress
          </span>
          <span className="inline-flex items-center gap-2 text-sm text-secondary">
            <svg width="13" height="13" viewBox="0 0 13 13" aria-hidden="true">
              <circle
                cx="6.5"
                cy="6.5"
                r="5.75"
                fill="var(--status-done)"
                stroke="var(--status-done)"
                strokeWidth="1.5"
              />
              <path
                d="M4 6.5l1.8 1.8L9 5"
                stroke="var(--bg-app)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            Done
          </span>
          <span className="inline-flex items-center gap-2 text-sm text-secondary">
            <svg width="13" height="13" viewBox="0 0 13 13" aria-hidden="true">
              <circle
                cx="6.5"
                cy="6.5"
                r="5.75"
                fill="none"
                stroke="var(--status-canceled)"
                strokeWidth="1.5"
              />
              <path
                d="M4.5 4.5l4 4M8.5 4.5l-4 4"
                stroke="var(--status-canceled)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            Canceled
          </span>
        </div>
        <p className="mt-2 text-xs text-muted">
          Cada estado tiene forma propia además de color — distinguibles con daltonismo.
        </p>
      </Section>

      <Section title="Prioridad">
        <div className="flex flex-wrap items-center gap-5">
          {(['none', 'low', 'medium', 'high'] as const).map((level, i) => (
            <span key={level} className="inline-flex items-end gap-2 text-sm text-secondary">
              <span className="inline-flex items-end gap-[1.5px]" aria-hidden="true">
                {[0, 1, 2].map((bar) => (
                  <span
                    key={bar}
                    className="w-[3px] rounded-[1px]"
                    style={{
                      height: `${5 + bar * 3}px`,
                      background: bar < i ? 'var(--priority-fg)' : 'var(--priority-off)',
                    }}
                  />
                ))}
              </span>
              {level}
            </span>
          ))}
          <span
            className="inline-flex items-center gap-1.5 text-sm"
            style={{ color: 'var(--priority-urgent)' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
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
                d="M7 4v3.2M7 9.6v.4"
                stroke="var(--priority-urgent)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            urgent
          </span>
        </div>
      </Section>

      <Section title="Tipografía">
        <div className="overflow-hidden rounded-lg border border-line">
          {typeScale.map((t) => (
            <div
              key={t.cls}
              className="flex items-baseline gap-4 border-b border-line bg-surface px-4 py-2 last:border-b-0"
            >
              <span className="w-20 font-mono text-2xs text-muted">
                {t.cls} · {t.px}
              </span>
              <span className={`${t.cls} text-primary`}>El tablero muestra 30 issues</span>
              <span className="ml-auto text-2xs text-muted">{t.use}</span>
            </div>
          ))}
          <div className="flex items-baseline gap-4 bg-surface px-4 py-2">
            <span className="w-20 font-mono text-2xs text-muted">mono</span>
            <span className="rounded-sm bg-raised px-1.5 font-mono text-xs text-secondary">
              WEB-42
            </span>
            <span className="ml-auto text-2xs text-muted">claves de issue, código</span>
          </div>
        </div>
      </Section>

      <Section title="Superficies, radios y sombras">
        <div className="grid grid-cols-3 gap-3">
          {(
            [
              ['app', 'var(--bg-app)', 'var(--shadow-1)', 'radius-sm 4px'],
              ['surface', 'var(--bg-surface)', 'var(--shadow-2)', 'radius-md 6px'],
              ['raised', 'var(--bg-raised)', 'var(--shadow-3)', 'radius-lg 8px'],
            ] as const
          ).map(([name, bg, shadow, radius], i) => (
            <div
              key={name}
              className={`border border-line p-4 ${i === 0 ? 'rounded-sm' : i === 1 ? 'rounded-md' : 'rounded-lg'}`}
              style={{ background: bg, boxShadow: shadow }}
            >
              <div className="text-sm text-primary">{name}</div>
              <div className="mt-1 font-mono text-2xs text-muted">
                shadow-{i + 1} · {radius}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Foco de teclado">
        <div className="flex flex-wrap gap-3">
          <button className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-accent-fg hover:bg-accent-hover">
            Acción primaria
          </button>
          <button className="rounded-md border border-line-strong bg-raised px-3 py-1.5 text-sm text-primary hover:bg-hover">
            Secundario
          </button>
          <input
            placeholder="Tabulá hasta acá…"
            className="rounded-md border border-line-strong bg-surface px-3 py-1.5 text-sm text-primary placeholder:text-muted"
          />
        </div>
        <p className="mt-2 text-xs text-muted">
          Navegá con Tab: todo estado interactivo tiene su :focus-visible diseñado, no el del
          navegador.
        </p>
      </Section>
    </main>
  );
}
