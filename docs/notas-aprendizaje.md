# Notas de aprendizaje

Bitácora personal de Brandon. **Escrita por vos, con tus palabras.**

No es documentación del proyecto ni resumen de la que ya existe. Es la prueba de que entendiste algo: si no podés escribirlo acá sin copiar, todavía no lo sabés.

Al terminar el proyecto, este archivo es tu guion para preparar la entrevista técnica.

## Cómo usarlo

Una entrada por concepto nuevo, cuando lo entendés. Formato sugerido:

```
## [Fecha] — Concepto

**Qué es** (en una frase, sin jerga)

**Por qué existe** — qué problema resuelve, qué pasaba antes

**Dónde lo usé** — archivo:línea de este proyecto

**Qué me confundió** — el malentendido que tenía antes de entenderlo.
Esta parte es la más valiosa: es lo que vas a poder explicar mejor que
otro candidato, porque te lo peleaste.
```

---

## Pendientes por revisar

Temas donde pedí la solución en vez de resolverlos, o que quedaron a medias. Volver antes de postular.

<!-- Se van agregando a medida que aparecen -->

---

## Entradas

<!-- La primera va en la Fase 0 -->
```
## [27 jul] — setup
** setup de la arquitectura (docker para levantar supabase y postgres, auth, etc.)**
** publisable key viaja en el frontend, es público por diseño, lo que no puede viajar es la secret key **
** el RLS (Row Level Security) controla el acceso a los datos a nivel de fila **
** RSL con 0 politicas niega todo por defecto, se configuran para otorgar acceso, no denegarlo.
```