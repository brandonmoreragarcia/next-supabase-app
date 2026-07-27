/**
 * Une clases condicionalmente. Versión mínima de clsx: no agregamos una
 * dependencia para 4 líneas (ver AGENTS.md sobre dependencias).
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
