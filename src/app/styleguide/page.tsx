import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/ui/icon-button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Toggle } from '@/components/ui/toggle';
import { Avatar, AvatarGroup } from '@/components/ui/avatar';
import { StatusBadge } from '@/components/ui/status-badge';
import { PriorityIndicator } from '@/components/ui/priority-indicator';
import { LabelChip } from '@/components/ui/label-chip';
import { Tooltip } from '@/components/ui/tooltip';
import { Card } from '@/components/ui/card';
import { ThemeToggle } from './theme-toggle';
import { ModalDemo } from './modal-demo';

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

      <Section title="StatusBadge">
        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-line bg-surface p-4">
          {(['backlog', 'todo', 'in_progress', 'done', 'canceled'] as const).map((s) => (
            <StatusBadge key={s} status={s} />
          ))}
          <span className="mx-2 h-4 w-px bg-line" />
          {(['backlog', 'todo', 'in_progress', 'done', 'canceled'] as const).map((s) => (
            <StatusBadge key={s} status={s} iconOnly />
          ))}
        </div>
        <p className="mt-2 text-xs text-muted">
          Cada estado tiene forma propia además de color — distinguibles con daltonismo. La versión
          iconOnly conserva el nombre para lectores de pantalla y como title.
        </p>
      </Section>

      <Section title="PriorityIndicator">
        <div className="flex flex-wrap items-center gap-5 rounded-lg border border-line bg-surface p-4">
          {(['none', 'low', 'medium', 'high', 'urgent'] as const).map((p) => (
            <PriorityIndicator key={p} priority={p} withLabel />
          ))}
          <span className="mx-2 h-4 w-px bg-line" />
          {(['none', 'low', 'medium', 'high', 'urgent'] as const).map((p) => (
            <PriorityIndicator key={p} priority={p} />
          ))}
        </div>
      </Section>

      <Section title="Avatar y AvatarGroup">
        <div className="flex flex-wrap items-center gap-5 rounded-lg border border-line bg-surface p-4">
          <Avatar name="Brandon Morera" size="sm" />
          <Avatar name="Brandon Morera" size="md" />
          <Avatar name="Brandon Morera" size="lg" />
          <Avatar name="Ada" size="md" />
          <span className="mx-2 h-4 w-px bg-line" />
          <AvatarGroup max={3}>
            <Avatar name="Brandon Morera" />
            <Avatar name="Grace Hopper" />
            <Avatar name="Alan Turing" />
            <Avatar name="Ada Lovelace" />
            <Avatar name="Margaret Hamilton" />
          </AvatarGroup>
        </div>
        <p className="mt-2 text-xs text-muted">
          Sin foto, las iniciales son el fallback (no un ícono genérico). El grupo recorta en max y
          suma el resto en +N.
        </p>
      </Section>

      <Section title="LabelChip y Tooltip">
        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-line bg-surface p-4">
          <LabelChip name="bug" color="#e5484d" />
          <LabelChip name="auth" color="#6e79d6" />
          <LabelChip name="seguridad" color="#e5a13c" />
          <LabelChip name="docs" color="#4cc38a" />
          <span className="mx-2 h-4 w-px bg-line" />
          <Tooltip label="Asignado a Brandon Morera">
            <Avatar name="Brandon Morera" />
          </Tooltip>
          <Tooltip label="Editar issue" side="bottom">
            <IconButton aria-label="Editar issue">
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M11.3 2.7a1.6 1.6 0 0 1 2.3 2.3l-7.3 7.3-3 .7.7-3 7.3-7.3z"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                />
              </svg>
            </IconButton>
          </Tooltip>
        </div>
        <p className="mt-2 text-xs text-muted">
          El chip usa el color solo como punto: el texto queda en tokens y no hay que calcular
          contraste por etiqueta. El tooltip aparece también con foco de teclado — probá con Tab.
        </p>
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

      <Section title="Button">
        <div className="space-y-4 rounded-lg border border-line bg-surface p-4">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Nuevo issue</Button>
            <Button>Secundario</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Eliminar</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" size="sm">
              Pequeño
            </Button>
            <Button variant="primary" size="md">
              Mediano
            </Button>
            <Button variant="primary" size="lg">
              Grande
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              icon={
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                  <path
                    d="M7 2.5v9M2.5 7h9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              }
            >
              Con ícono
            </Button>
            <Button variant="primary" loading>
              Guardando
            </Button>
            <Button loading>Cargando</Button>
            <Button variant="primary" disabled>
              Deshabilitado
            </Button>
            <Button disabled>Deshabilitado</Button>
          </div>
        </div>
        <p className="mt-2 text-xs text-muted">
          Variantes: primary (única acción con acento por vista), secondary (el default), ghost,
          danger. El spinner de loading reemplaza al ícono para que el ancho no salte.
        </p>
      </Section>

      <Section title="IconButton">
        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-line bg-surface p-4">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <IconButton key={size} size={size} aria-label="Editar issue">
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M11.3 2.7a1.6 1.6 0 0 1 2.3 2.3l-7.3 7.3-3 .7.7-3 7.3-7.3z"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                />
              </svg>
            </IconButton>
          ))}
          <IconButton variant="secondary" aria-label="Cerrar">
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M4 4l8 8M12 4l-8 8"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          </IconButton>
          <IconButton variant="danger" aria-label="Eliminar issue">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M2.5 4.5h11M6.5 4V2.5h3V4M4 4.5l.7 9h6.6l.7-9M6.5 7v4M9.5 7v4"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          </IconButton>
          <IconButton disabled aria-label="Editar issue">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M11.3 2.7a1.6 1.6 0 0 1 2.3 2.3l-7.3 7.3-3 .7.7-3 7.3-7.3z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
            </svg>
          </IconButton>
        </div>
        <p className="mt-2 text-xs text-muted">
          aria-label obligatorio a nivel de tipos: sin él no compila. Default ghost — en la UI densa
          los solo-ícono casi siempre van sin borde.
        </p>
      </Section>

      <Section title="Input">
        <div className="grid max-w-sm gap-3 rounded-lg border border-line bg-surface p-4">
          <Input placeholder="Nombre del proyecto" />
          <Input defaultValue="Tracker" />
          <Input invalid defaultValue="WEB 42" aria-describedby="key-error" />
          <p id="key-error" className="-mt-2 text-xs text-danger">
            La clave solo admite letras mayúsculas, sin espacios.
          </p>
          <Input disabled placeholder="Deshabilitado" />
        </div>
      </Section>

      <Section title="Textarea y Select">
        <div className="grid max-w-sm gap-3 rounded-lg border border-line bg-surface p-4">
          <Textarea placeholder="Describe el problema. Se admite markdown." />
          <Textarea invalid defaultValue="x" aria-describedby="desc-error" />
          <p id="desc-error" className="-mt-2 text-xs text-danger">
            La descripción necesita al menos 10 caracteres.
          </p>
          <Select defaultValue="in_progress">
            <option value="backlog">Backlog</option>
            <option value="todo">Todo</option>
            <option value="in_progress">In progress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </Select>
          <Select disabled defaultValue="none">
            <option value="none">Deshabilitado</option>
          </Select>
        </div>
      </Section>

      <Section title="Checkbox y Toggle">
        <div className="grid max-w-sm gap-3 rounded-lg border border-line bg-surface p-4">
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-primary">
            <Checkbox /> Seleccionar issue
          </label>
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-primary">
            <Checkbox defaultChecked /> Marcado por defecto
          </label>
          <label className="flex items-center gap-2.5 text-sm text-disabled">
            <Checkbox disabled /> Deshabilitado
          </label>
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-primary">
            <Toggle /> Notificaciones del proyecto
          </label>
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-primary">
            <Toggle defaultChecked /> Realtime activado
          </label>
          <label className="flex items-center gap-2.5 text-sm text-disabled">
            <Toggle disabled /> Deshabilitado
          </label>
        </div>
        <p className="mt-2 text-xs text-muted">
          Ambos usan un input nativo invisible debajo del dibujo: teclado, formularios y lectores de
          pantalla funcionan sin JavaScript. Probá Space con el foco puesto.
        </p>
      </Section>

      <Section title="Card y Modal">
        <div className="grid gap-3 sm:grid-cols-2">
          <Card>
            <h3 className="text-sm font-medium text-primary">Card con padding</h3>
            <p className="mt-1 text-sm text-secondary">
              La superficie por defecto para agrupar contenido.
            </p>
          </Card>
          <Card flush>
            <div className="border-b border-line px-4 py-2 text-sm text-primary">flush: fila 1</div>
            <div className="px-4 py-2 text-sm text-secondary">
              Para listas que manejan su propio padding por fila.
            </div>
          </Card>
        </div>
        <div className="mt-3">
          <ModalDemo />
        </div>
        <p className="mt-2 text-xs text-muted">
          El modal usa dialog nativo: probá Esc, click afuera, y que Tab quede atrapado adentro
          mientras está abierto.
        </p>
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
