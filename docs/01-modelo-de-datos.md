# Modelo de datos

Propuesta de schema para Tracker. **Es un punto de partida para discutir, no una decisión cerrada** — parte del ejercicio de la Fase 3 es que lo cuestiones antes de escribir la primera migración.

---

## Entidades

```
auth.users (lo maneja Supabase)
   │
   └─ profiles                 datos públicos del usuario
        │
        └─ organization_members  ─── organizations
                                        │
                                        ├─ invitations
                                        │
                                        └─ projects
                                             │
                                             └─ issues ──┬─ comments
                                                         ├─ attachments
                                                         ├─ issue_events
                                                         └─ issue_labels ─── labels
```

### `profiles`
Espejo público de `auth.users`. Existe porque `auth.users` no se debe exponer al cliente.

`id` (FK a `auth.users`, PK) · `full_name` · `avatar_url` · `created_at`

Se crea sola con un trigger `after insert on auth.users`.

### `organizations`
El límite del *tenant*. Todo dato del producto cuelga de acá.

`id` · `name` · `slug` (único, va en la URL) · `created_at`

### `organization_members`
Tabla puente. **Es la tabla más importante del sistema de permisos:** define quién ve qué.

`org_id` · `user_id` · `role` (`owner` | `admin` | `member`) · `created_at` — PK compuesta `(org_id, user_id)`

### `invitations`
`id` · `org_id` · `email` · `role` · `token` · `expires_at` · `accepted_at`

### `projects`
`id` · `org_id` · `name` · `key` (2–5 letras mayúsculas, ej. `WEB`) · `description` · `issue_counter` · `archived_at`

`key` es único dentro de la org. `issue_counter` alimenta la numeración de issues.

### `issues`
`id` · `project_id` · `number` (secuencial por proyecto) · `title` · `description` · `status` · `priority` · `assignee_id` · `created_by` · `created_at` · `updated_at` · `search_vector`

Se muestran como `WEB-42`. `(project_id, number)` es único.

`status`: `backlog` | `todo` | `in_progress` | `done` | `canceled`
`priority`: `none` | `low` | `medium` | `high` | `urgent`

Ambos como `enum` de Postgres, no como `text`.

### `comments`
`id` · `issue_id` · `author_id` · `body` · `created_at` · `edited_at`

### `attachments`
`id` · `issue_id` · `storage_path` · `filename` · `size_bytes` · `mime_type` · `uploaded_by`

### `issue_events`
Log de auditoría — cada cambio de estado, responsable o prioridad deja rastro. Alimenta el timeline del issue.

`id` · `issue_id` · `actor_id` · `type` · `data` (jsonb) · `created_at`

### `labels` / `issue_labels`
Etiquetas por organización, relación N:N con issues.

---

## Los tres problemas interesantes

Estos son los que te van a hacer aprender de verdad. No están resueltos acá a propósito.

### 1. La recursión infinita en las políticas RLS

La política natural sobre `organization_members` es *"puedo ver las filas de las organizaciones a las que pertenezco"*. Escrita de la forma obvia:

```
policy on organization_members:
  USING ( org_id IN (SELECT org_id FROM organization_members WHERE user_id = auth.uid()) )
                                    ^^^^^^^^^^^^^^^^^^^^^^^^
                                    esta consulta también evalúa
                                    la política... que consulta la
                                    tabla... que evalúa la política...
```

Postgres corta con `infinite recursion detected in policy for relation "organization_members"`. Es *el* error clásico de Supabase multi-tenant.

**Tu tarea (Fase 3):** entender por qué pasa y resolverlo. La pista es que existe una forma de que una función SQL consulte una tabla **sin** que se apliquen sus políticas. Buscá `SECURITY DEFINER` y prestá atención al `search_path`, que ahí hay un agujero de seguridad si lo hacés mal.

### 2. La numeración secuencial por proyecto

`WEB-1`, `WEB-2`, `WEB-3`… Un `serial` global no sirve: cada proyecto necesita su propia serie.

La solución ingenua es `SELECT max(number) + 1`. Falla en cuanto dos personas crean un issue al mismo tiempo: ambas leen el mismo máximo y una de las dos inserciones revienta contra el índice único.

**Tu tarea (Fase 4):** implementarlo de forma correcta bajo concurrencia, con un trigger `before insert`. La pista está en el campo `issue_counter` de `projects` y en qué garantiza Postgres cuando actualizás una fila. Vas a escribir un test que lance N inserciones en paralelo y verifique que no hay huecos ni duplicados.

### 3. Herencia de permisos en cascada

Un issue no tiene `org_id`. Su acceso depende de `project_id → org_id → organization_members`. Cada lectura de issue implica seguir esa cadena.

**Tu tarea (Fase 3–4):** decidir el trade-off.
- **Normalizado** (seguir la cadena en cada policy): sin datos duplicados, pero un `join` por cada verificación.
- **Desnormalizado** (guardar `org_id` también en `issues`): policies más simples y rápidas, pero hay que garantizar que nunca se desincronice.

No hay respuesta correcta universal — hay una respuesta correcta *para este caso*, y tenés que poder defenderla. Esta es exactamente la clase de pregunta que aparece en una entrevista senior.

---

## Reglas de RLS que no se negocian

- **Toda tabla tiene RLS habilitada desde su migración de creación.** Sin excepciones, ni siquiera "temporalmente".
- Políticas separadas por operación (`select`, `insert`, `update`, `delete`). Una policy `for all` esconde bugs.
- `insert` y `update` necesitan `with check`, no solo `using`. Entender la diferencia es obligatorio: sin `with check` un usuario puede mover una fila fuera de su propia organización.
- Escalar privilegios se controla en la base, no en la UI: un `member` no puede ascenderse a `admin` aunque manipule el request.
- La `service_role` key **nunca** llega al navegador. Si aparece en código cliente, es un incidente de seguridad, no un bug.

## Cómo se testea todo esto

En la Fase 8 escribís tests que actúan como un atacante:

- Usuario de la org A intenta leer issues de la org B → 0 filas
- Usuario de la org A intenta insertar un issue en un proyecto de B → error
- Un `member` intenta cambiar su propio rol a `owner` → error
- Un usuario expulsado de la org pierde el acceso inmediatamente
- Un usuario anónimo no lee absolutamente nada

Estos tests son el mejor material de portfolio del proyecto: demuestran que pensás en seguridad, no solo en que la pantalla cargue.
