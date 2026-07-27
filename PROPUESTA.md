# Propuesta de proyecto — "Tracker"

Proyecto de portfolio para postular a un puesto con stack **Node.js · TypeScript · React/Next.js · Supabase (Postgres)**.

El objetivo doble es:

1. **Tener algo que mostrar** que demuestre que dominás el stack que piden.
2. **Aprender de verdad** Next.js, Node y Supabase escribiéndolo vos, no generándolo.

---

## 1. El producto

**Tracker** — un gestor de issues multi-tenant, estilo Linear reducido.

Una persona se registra, crea o se une a una **organización**, dentro de la organización hay **proyectos**, y dentro de cada proyecto hay **issues** con estado, prioridad, responsable, comentarios y adjuntos. Varias personas trabajan sobre el mismo tablero y ven los cambios en vivo.

### Por qué este producto y no otro

No es por el producto en sí (hay mil clones de Linear). Es porque el camino más corto para tocar **todo lo que se pregunta en una entrevista de este stack** pasa por acá:

| Lo que el producto obliga a resolver | Lo que demuestra |
|---|---|
| Una org no puede ver los datos de otra | **Row Level Security multi-tenant** — el tema más difícil de Supabase y el que casi nadie hace bien |
| Roles `owner` / `admin` / `member` | Autorización a nivel de base de datos, no de UI |
| El tablero se actualiza cuando otro usuario mueve una tarjeta | **Realtime** + estado optimista en React |
| Issues numeradas `WEB-42` por proyecto | Triggers y funciones en Postgres, concurrencia |
| Listados rápidos con filtros y búsqueda | Índices, `tsvector`, paginación con cursor |
| Formularios que mutan datos | **Server Actions** + validación en el servidor |
| Adjuntar imágenes a un issue | Supabase Storage con políticas de acceso |

Esa columna derecha es, literalmente, el temario de la entrevista.

### Alcance (qué entra y qué no)

**Entra (v1):**
- Auth por email + OAuth (GitHub)
- Organizaciones, invitaciones por email, roles
- Proyectos con clave corta (`WEB`, `API`)
- Issues: título, descripción markdown, estado, prioridad, responsable, etiquetas
- Vista tablero (kanban con drag & drop) y vista lista con filtros
- Comentarios y registro de actividad por issue
- Adjuntos
- Búsqueda full-text
- Tests + CI + deploy público

**No entra (queda como "próximos pasos" en el README):**
- Notificaciones por email/push
- Sprints, estimaciones, roadmaps
- API pública, webhooks
- Facturación

Recortar el alcance a propósito y documentarlo también es señal de criterio profesional. Un proyecto terminado y pulido vale más que uno ambicioso a medias.

---

## 2. Stack técnico

| Capa | Elección | Por qué |
|---|---|---|
| Framework | **Next.js (App Router)** | Es lo que piden. Server Components + Server Actions es el modelo mental actual |
| Lenguaje | **TypeScript** en modo `strict` | Tipos generados desde el schema de Supabase, end-to-end |
| Base de datos | **Postgres vía Supabase** | Migraciones versionadas en el repo con el CLI, no clicks en el dashboard |
| Auth | **Supabase Auth** + `@supabase/ssr` | Sesión en cookies, middleware de refresh |
| Estilos | **Tailwind CSS** + componentes propios | Los componentes salen de Claude Design (Fase 1) |
| Validación | **Zod** | Un solo esquema para el form y para el Server Action |
| Tests | **Vitest** (unit) · **Playwright** (e2e) · **SQL** (políticas RLS) | Testear las RLS es el detalle que diferencia |
| CI/CD | **GitHub Actions** → **Vercel** | Lint, typecheck, tests y migraciones en cada PR |

**Decisión deliberada:** nada de ORM (Prisma/Drizzle) en v1. Vas a escribir SQL y usar el cliente de Supabase directo. Si en la entrevista te preguntan por RLS, índices o `explain analyze`, querés haber tocado eso a mano, no detrás de una abstracción.

---

## 3. Cómo vamos a trabajar

Este es el punto central de la propuesta. El riesgo obvio de construir esto con Claude Code es terminar con un repo que funciona y que no sabés explicar. Así que el reparto de trabajo está fijado por escrito y lo respeto en cada sesión.

### Reparto por capas

**Yo escribo** (lo repetitivo, lo que no se pregunta en entrevistas):
- Configuración: `tsconfig`, ESLint, Prettier, Tailwind, `next.config`, workflows de CI
- Layouts, estructura de rutas, componentes de presentación puros
- Markup de formularios, estados de carga, skeletons
- Andamiaje de tests: setup, fixtures, helpers
- Archivos de migración **vacíos**, con comentarios de qué debe contener cada uno

**Vos escribís** (todo lo que define si sabés el stack):
- **Todo el SQL**: schema, índices, funciones, triggers y **cada política RLS**
- **Server Actions** y validación
- **Data fetching**: queries a Supabase, Server Components que cargan datos
- **Lógica de negocio**: estado optimista, suscripciones realtime, manejo de errores
- Los `expect` de los tests (yo pongo la estructura, vos definís qué se verifica)

### El ritual de cada tarea

1. **Concepto** — te explico en ~10 líneas la idea nueva que necesita la tarea (qué es una política RLS, qué corre en servidor y qué en cliente, por qué `revalidatePath`).
2. **Especificación** — te dejo la firma de la función o el archivo vacío con criterios de aceptación concretos.
3. **Lo implementás vos.**
4. **Code review** — reviso tu código como lo haría un tech lead: qué está bien, qué rompe bajo concurrencia, qué se lee mal. **No edito tu archivo**, te digo qué cambiar.
5. **Lo corregís vos** y cerramos la tarea.

### Cuando te trabes

Pedime ayuda y te doy pistas en escalones, no la respuesta:
- **Nivel 1** — dónde mirar ("esto es un problema de recursión en la policy, mirá qué tabla consulta").
- **Nivel 2** — la técnica que lo resuelve, sin código.
- **Nivel 3** — código, pero de un caso análogo, no del tuyo.

Solo si pedís explícitamente "dame la solución", te la doy — y en ese caso te la explico línea por línea y anotamos el tema en `docs/notas-aprendizaje.md` para volver.

Estas reglas están escritas en [`CLAUDE.md`](./CLAUDE.md), así que aplican en cualquier sesión futura de Claude Code sobre este repo, incluso si empezamos de cero.

### Registro de aprendizaje

En `docs/notas-aprendizaje.md` vas anotando, en tus palabras, lo que fuiste entendiendo. No es burocracia: al final del proyecto ese archivo es tu guion para la entrevista técnica. Si no podés escribir un tema con tus palabras, no lo sabés todavía.

---

## 4. Fases

Detalle completo, con objetivos de aprendizaje y reparto tarea por tarea, en [`docs/03-roadmap.md`](./docs/03-roadmap.md).

| # | Fase | Foco | Estimado |
|---|---|---|---|
| 0 | Setup | Repo, Next.js, Supabase local, tipos generados | 1 sesión |
| 1 | **Diseño** | Design system en Claude Design → componentes en el repo | 1–2 sesiones |
| 2 | Auth y perfiles | `@supabase/ssr`, cookies, middleware, rutas protegidas | 2 sesiones |
| 3 | **Multi-tenancy y RLS** | Orgs, miembros, roles, políticas. **El corazón del proyecto** | 3 sesiones |
| 4 | Proyectos e issues | CRUD con Server Actions, numeración por trigger | 3 sesiones |
| 5 | Tablero y realtime | Kanban, drag & drop, suscripciones, estado optimista | 2 sesiones |
| 6 | Comentarios, adjuntos, actividad | Storage con políticas, log de auditoría | 2 sesiones |
| 7 | Búsqueda y performance | `tsvector`, índices, `explain analyze`, paginación | 1–2 sesiones |
| 8 | Tests, CI, deploy | Vitest, Playwright, tests de RLS, Actions, Vercel | 2 sesiones |
| 9 | Pulido para postular | README, datos de demo, video, caso técnico escrito | 1 sesión |

Las fases 3 y 8 son las que más pesan en una entrevista. Si el tiempo aprieta, se recorta de 6 y 7, nunca de esas dos.

---

## 5. Fase 1 en detalle — el diseño

El proyecto arranca por el diseño, antes de escribir la app.

**En Claude Design** (claude.ai/design) armamos un *design system* como proyecto: tokens (color, tipografía, espaciado, radios) y los componentes de UI en HTML/CSS aislados — botones, inputs, badges de estado y prioridad, avatares, tarjeta de issue, modal, menú, toast, sidebar, estado vacío, skeleton. Más mockups de las 5 pantallas clave.

**Luego lo bajamos al repo** con la herramienta de sincronización de Claude Design, componente por componente, y los portamos a React + Tailwind.

Por qué en este orden:
- Decidir el diseño primero evita el look de "app generada por IA" que un entrevistador reconoce al instante.
- Tener el sistema de componentes cerrado antes de programar significa que cada feature después es lógica, no pelearse con CSS. Eso protege el tiempo para lo que importa.
- Es la única fase donde tiene sentido que la parte visual venga mayormente hecha: el trabajo visual no es lo que te van a preguntar.

El brief con el detalle de tokens, componentes y pantallas está en [`docs/02-brief-diseno.md`](./docs/02-brief-diseno.md).

---

## 6. Entregables al final

1. **App desplegada** con datos de demo y un usuario de prueba para que cualquiera entre sin registrarse.
2. **Repo público** con historial de commits legible, PRs y CI en verde.
3. **README** con el problema, las decisiones técnicas y sus trade-offs, y el diagrama del modelo de datos.
4. **`docs/caso-tecnico.md`** — 2 páginas sobre cómo resolviste el aislamiento multi-tenant con RLS. Esto es lo que enlazás en la postulación: no "hice una app", sino "resolví este problema difícil, así, y por eso".
5. **Tus notas de aprendizaje** — para vos, para preparar la entrevista.

---

## 7. Qué necesito de vos para arrancar

- [ ] Confirmar el nombre del producto (uso "Tracker" como provisorio)
- [ ] Cuenta de Supabase creada (plan free alcanza)
- [ ] Docker corriendo en tu máquina (lo necesita el CLI de Supabase para el entorno local)
- [ ] Cuenta de Vercel conectada a GitHub
- [ ] Decidir el ritmo: cuántas sesiones por semana y de cuánto tiempo, para dimensionar las tareas

Con eso arrancamos por la Fase 0 y la Fase 1.

---

## Documentos relacionados

- [`CLAUDE.md`](./CLAUDE.md) — reglas de trabajo que aplico en cada sesión
- [`docs/01-modelo-de-datos.md`](./docs/01-modelo-de-datos.md) — entidades, relaciones y estrategia de RLS
- [`docs/02-brief-diseno.md`](./docs/02-brief-diseno.md) — brief para Claude Design
- [`docs/03-roadmap.md`](./docs/03-roadmap.md) — plan fase por fase con objetivos de aprendizaje
