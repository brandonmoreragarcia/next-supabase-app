# Roadmap

Plan fase por fase. Cada fase declara **qué vas a aprender**, **quién escribe qué** y **cuándo se considera terminada**.

Regla general: una fase no se cierra hasta que podés explicar en voz alta lo que hiciste sin mirar el código. Ese es el criterio real — no que compile.

---

## Fase 0 — Setup

**Aprendés:** cómo se estructura un proyecto Next.js moderno y cómo correr Postgres localmente con el CLI de Supabase.

- Next.js con App Router, TypeScript `strict`, Tailwind
- ESLint, Prettier, scripts de npm
- `supabase init` + `supabase start` (Postgres, Auth y Storage locales en Docker)
- Generación de tipos desde el schema
- `.env.example` y variables de entorno

**Yo:** todo lo de esta fase.
**Vos:** levantás el entorno local y confirmás que `supabase start` funciona. Leés qué levantó cada contenedor.

**Cierre:** `npm run dev` levanta la app, `supabase start` levanta la base, `npm run db:types` genera tipos.

---

## Fase 1 — Diseño

**Aprendés:** a separar el sistema de componentes de la lógica de la aplicación.

Ver [`02-brief-diseno.md`](./02-brief-diseno.md) para el detalle completo.

**Yo:** sincronizo desde Claude Design y porto los componentes a React + Tailwind.
**Vos:** revisás cada componente antes de aceptarlo. Escribís vos `IssueCard` y `BoardColumn`.

**Cierre:** `/styleguide` renderiza todo el sistema en ambos temas.

---

## Fase 2 — Auth y perfiles

**Aprendés:** el modelo mental de Next.js — qué corre en el servidor, qué en el cliente, y cómo viaja una sesión entre los dos. Es el concepto que más gente tiene flojo y el que más se pregunta.

- `@supabase/ssr`: por qué hay **tres** clientes distintos (browser, server, middleware) y qué pasa si usás el que no va
- Sesión en cookies y por qué no en `localStorage`
- Middleware para refrescar el token
- Rutas protegidas con Route Groups: `(auth)` y `(app)`
- Trigger que crea el `profile` al registrarse

**Yo:** los tres clientes de Supabase, el layout de auth, el markup de los formularios.
**Vos:** el middleware, la lógica de protección de rutas, los Server Actions de login/signup/logout, el trigger SQL de `profiles`.

**Cierre:** te registrás, cerrás sesión, volvés a entrar. `/dashboard` sin sesión redirige a login. Sabés explicar por qué el middleware es necesario.

> **Trampa clásica:** vas a intentar leer la sesión desde un Server Component con el cliente de browser. Va a fallar de forma confusa. Cuando pase, es la fase haciendo su trabajo.

---

## Fase 3 — Multi-tenancy y RLS ⭐

**La fase más importante del proyecto.** Si el tiempo aprieta, se recorta cualquier otra cosa antes que esta.

**Aprendés:** Row Level Security en serio — el diferencial real de Supabase frente a "Postgres con una API encima".

- `organizations`, `organization_members`, `invitations`
- Políticas por operación, `using` vs `with check`
- **La recursión infinita** y cómo se resuelve (ver [`01-modelo-de-datos.md`](./01-modelo-de-datos.md#los-tres-problemas-interesantes))
- `SECURITY DEFINER` y por qué `set search_path` no es opcional
- Roles y permisos: quién invita, quién expulsa, quién no puede ascenderse solo
- `auth.uid()` y cómo llega el JWT a la base

**Yo:** los archivos de migración vacíos con los criterios de aceptación de cada uno. La UI de la pantalla de miembros. Los casos de test que intentan romper tus políticas.
**Vos:** **todo el SQL, sin excepción.** Tablas, funciones, triggers, políticas. Yo no escribo una sola policy en este proyecto.

**Cierre:** existen dos organizaciones con datos, y ningún usuario de una puede ver nada de la otra — verificado con consultas directas a la base, no solo con la UI.

---

## Fase 4 — Proyectos e issues

**Aprendés:** el ciclo completo de mutación de datos en Next.js moderno.

- Server Actions: validación con Zod, retorno de errores, `revalidatePath`
- `useFormStatus` / `useActionState` para estados pendientes
- La **numeración secuencial por proyecto** bajo concurrencia (ver el problema 2 en el modelo de datos)
- Cargar datos en Server Components y evitar el N+1
- Rutas dinámicas: `/[org]/[project]/[issue]`

**Yo:** rutas, layouts, componentes de formulario, la migración vacía del trigger.
**Vos:** todos los Server Actions, todos los esquemas Zod, el trigger de numeración, todas las queries.

**Cierre:** creás un proyecto y varios issues, se numeran `KEY-1`, `KEY-2`… y el test de concurrencia pasa.

---

## Fase 5 — Tablero y realtime

**Aprendés:** dónde termina el servidor y empieza el cliente, y cómo mantener consistencia entre los dos.

- Kanban con drag & drop (`dnd-kit`)
- Actualizaciones optimistas: mover la tarjeta ya, revertir si el servidor rechaza
- Supabase Realtime: suscripción a los cambios del proyecto, limpieza al desmontar
- El problema del **eco**: no reprocesar tu propio cambio cuando vuelve por el canal
- Reconciliar el estado del canal con el de Next.js

**Yo:** el contenedor del drag & drop y el cableado de `dnd-kit`.
**Vos:** la lógica optimista, la suscripción realtime, la reconciliación, el manejo de reconexión.

**Cierre:** dos navegadores abiertos en el mismo tablero. Movés una tarjeta en uno y aparece en el otro sin refrescar. Cortás la red y la UI se recupera sola.

---

## Fase 6 — Comentarios, adjuntos y actividad

**Aprendés:** Storage con control de acceso y patrones de auditoría.

- Buckets de Supabase Storage y **sus políticas** (los archivos también necesitan RLS)
- Subida directa desde el cliente con URLs firmadas, sin pasar por tu servidor
- Timeline de actividad alimentado por triggers en la base, no por código de la app
- Comentarios en markdown, sanitizados

**Yo:** el componente de upload, el markup del timeline.
**Vos:** las políticas del bucket, la lógica de subida, los triggers de `issue_events`.

**Cierre:** un usuario de otra organización no puede descargar tu adjunto ni con la URL directa.

---

## Fase 7 — Búsqueda y performance

**Aprendés:** que la base de datos también se optimiza — el tema que casi ningún candidato junior toca.

- Full-text search con `tsvector`, columna generada e índice GIN
- `explain analyze`: leer un plan de ejecución y detectar un seq scan
- Qué índices hacen falta según tus consultas reales
- Paginación por cursor y por qué `offset` no escala

**Yo:** el markup de la barra de búsqueda y filtros.
**Vos:** el `tsvector`, los índices, la función de búsqueda, la paginación. Y medís antes y después.

**Cierre:** con 10.000 issues sembrados, la búsqueda responde en menos de 100ms, y tenés el `explain analyze` del antes y el después escrito en tus notas.

---

## Fase 8 — Tests, CI y deploy ⭐

La segunda fase que más pesa en una entrevista. Un proyecto con tests dice más que uno con más features.

**Aprendés:** cómo se prueba y se despliega esto de verdad.

- Vitest para lógica y validaciones
- Playwright para los flujos críticos (registro → crear org → crear issue)
- **Tests de RLS**: SQL que se hace pasar por distintos usuarios y verifica el aislamiento
- GitHub Actions: lint, typecheck, tests y migraciones en cada PR
- Deploy a Vercel + proyecto de Supabase en la nube, con las migraciones aplicadas desde CI

**Yo:** configuración de Vitest y Playwright, fixtures, helpers, los workflows de CI.
**Vos:** todos los asserts. Especialmente los tests de RLS — escribí primero los que intentan romper la seguridad.

**Cierre:** CI en verde en un PR, app pública funcionando, y los tests de RLS fallan si comentás una política.

---

## Fase 9 — Pulido para postular

**Aprendés:** a comunicar trabajo técnico, que es la mitad de conseguir el puesto.

- README con problema, decisiones y trade-offs
- Datos de demo y usuario de prueba para entrar sin registrarse
- Diagrama del modelo de datos
- **`docs/caso-tecnico.md`** — 2 páginas sobre cómo resolviste el aislamiento multi-tenant. Esto es lo que enlazás en la postulación.
- Video de 2 minutos mostrando la app
- Repasar `notas-aprendizaje.md` y preparar respuestas a las 10 preguntas probables

**Yo:** estructura de los documentos y revisión de redacción.
**Vos:** el contenido. Son tus decisiones, las tenés que poder contar vos.

**Cierre:** le mostrás el proyecto a alguien que no lo vio nunca y entiende qué es y por qué está bien hecho.

---

## Preguntas de entrevista que este proyecto te deja responder

Si al terminar podés responder estas sin dudar, el proyecto cumplió:

1. ¿Qué es RLS y en qué se diferencia de validar permisos en el backend?
2. ¿Por qué se produce recursión infinita en las políticas y cómo se evita?
3. Diferencia entre `using` y `with check`. ¿Qué se rompe si falta el segundo?
4. ¿Qué corre en el servidor y qué en el cliente en el App Router? ¿Cómo lo sabés?
5. ¿Por qué la sesión va en cookies y no en `localStorage`?
6. ¿Qué es un Server Action y en qué se diferencia de un endpoint de API?
7. ¿Cómo generás un número secuencial por grupo sin condiciones de carrera?
8. ¿Cómo mantenés la UI consistente con actualizaciones optimistas y realtime a la vez?
9. ¿Cómo detectás y arreglás una consulta lenta en Postgres?
10. ¿Cómo probás que tu aislamiento multi-tenant realmente funciona?
