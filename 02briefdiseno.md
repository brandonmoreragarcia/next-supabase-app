# Brief de diseño — Fase 1

Qué construir en **Claude Design** (claude.ai/design) antes de escribir una línea de la app.

## Por qué el diseño va primero

- Evita el aspecto de "app generada por IA" que un entrevistador detecta al instante.
- Con el sistema de componentes cerrado, cada feature posterior es lógica pura y no una pelea con CSS. Eso protege el tiempo para lo que sí te van a preguntar.
- Es la única fase donde tiene sentido que el trabajo venga mayormente hecho: nadie te va a entrevistar por tu CSS, te van a entrevistar por tus RLS.

---

## Dirección visual

Herramienta de trabajo, densa en información, que se usa 8 horas por día. Referencias: Linear, Height, Vercel Dashboard.

- **Denso, no aireado.** Filas compactas, mucha información por pantalla. Un tablero tiene que mostrar 30 issues sin scroll.
- **Neutro con un solo acento.** Grises fríos como base y un color de marca que se usa poco: acción primaria, foco, selección. El color se reserva para significado (estados, prioridades), no para decorar.
- **Modo oscuro desde el día uno**, no agregado después. Es una app de desarrolladores.
- **Teclado primero.** Todo estado interactivo tiene su versión `:focus-visible` visible y diseñada, no la del navegador.
- Tipografía sistema (`ui-sans-serif`) para la UI, monoespaciada para claves de issue (`WEB-42`) y bloques de código.

---

## Entregable 1 — Tokens

- **Color:** escala neutra de 11 pasos, escala de acento, y semánticos (`success`, `warning`, `danger`, `info`). Cada token definido en claro y oscuro.
- **Estados:** un color por cada `status` (backlog, todo, in_progress, done, canceled) y por cada `priority` (none → urgent). Tienen que distinguirse **sin depender solo del color** — hace falta forma o ícono, para daltonismo.
- **Tipografía:** escala de 6 tamaños con su `line-height` y `weight`.
- **Espaciado:** escala de 4px. **Radios**: 3 valores. **Sombras**: 3 niveles.

Todo el contraste texto/fondo tiene que pasar WCAG AA (4.5:1). En ambos temas.

## Entregable 2 — Componentes

Cada uno con todos sus estados: default, hover, focus, active, disabled, loading, error.

**Base**
`Button` (primary / secondary / ghost / danger, 3 tamaños, con ícono) · `IconButton` · `Input` · `Textarea` · `Select` · `Checkbox` · `Toggle`

**Datos**
`Avatar` + `AvatarGroup` (con fallback de iniciales) · `StatusBadge` (5 estados) · `PriorityIndicator` (5 niveles) · `LabelChip` · `Tooltip`

**Superficies**
`Card` · `Modal` · `DropdownMenu` · `Popover` · `Toast` · `CommandPalette` (⌘K)

**De producto**
`IssueRow` (fila de la vista lista) · `IssueCard` (tarjeta del kanban, con estado *arrastrando*) · `BoardColumn` (con contador y estado vacío) · `CommentItem` · `ActivityItem` (evento del timeline) · `Sidebar` · `Topbar` con breadcrumbs · `OrgSwitcher`

**Estados de la app**
`EmptyState` (3 variantes: sin proyectos, sin issues, sin resultados de búsqueda) · `Skeleton` para lista y tablero · `ErrorState`

## Entregable 3 — Pantallas

1. **Login / registro** — email + botón de GitHub
2. **Onboarding** — crear organización o aceptar invitación
3. **Tablero del proyecto** — kanban, 5 columnas, con la barra de filtros. *La pantalla insignia del proyecto.*
4. **Vista lista** — tabla densa, agrupable, con selección múltiple
5. **Detalle del issue** — descripción, propiedades a la derecha, comentarios y timeline de actividad
6. **Miembros de la organización** — tabla con roles e invitaciones pendientes

Cada una en escritorio (1440px) y móvil (390px), en tema claro y oscuro.

---

## Del diseño al código

1. El design system vive como proyecto en Claude Design.
2. Se sincroniza al repo con la herramienta de Claude Design (`DesignSync`), **componente por componente**, nunca de golpe.
3. Cada componente se porta a React + Tailwind en `src/components/ui/`.
4. Los tokens salen a variables CSS y se enchufan a la config de Tailwind.

### Reparto en esta fase

- **Yo**: sincronizo, porto los componentes a React y monto la estructura.
- **Vos**: revisás cada componente portado antes de aceptarlo, y armás vos mismo `IssueCard` y `BoardColumn` — son los dos que después vas a modificar más, y conviene que los conozcas por dentro.

### Criterio de cierre de la fase

Una página `/styleguide` que renderiza cada componente en todos sus estados, en ambos temas, sin ningún dato real de la app detrás. Si algo no se ve bien ahí, no se va a ver bien en producción.
