# MCP A11y Server

Servidor MCP para orquestación de herramientas de accesibilidad web (axe-core, Pa11y, eslint-plugin-vuejs-accessibility).

## Estado: Fase 1 Completada ✅

Infraestructura base lista. Sin tools funcionales aún.

## Estructura

```
src/
├── server.ts        # Entry point MCP
├── types/           # Schemas Zod (inputs, outputs, validación)
├── adapters/        # Wrappers para herramientas externas
├── normalizers/     # Transformación a formato unificado
├── tools/           # Definiciones de tools MCP
└── utils/           # Logger (pino → stderr)
```

## Scripts

```bash
pnpm build      # Compila a dist/
pnpm dev        # Watch mode
pnpm typecheck  # Verifica tipos
pnpm start      # Levanta servidor
```

## Configuración

| Variable    | Default | Descripción                      |
|-------------|---------|----------------------------------|
| `LOG_LEVEL` | `info`  | `debug`, `info`, `warn`, `error` |


## Requisitos

- Node.js ≥ 20
- pnpm
