# AI-ccesibility

Servidor MCP para orquestación de herramientas de accesibilidad web (axe-core, Pa11y, eslint-plugin-vuejs-accessibility).

## Herramientas Disponibles

### `analyze-with-axe`

Analiza una página web o contenido HTML para detectar problemas de accesibilidad usando axe-core.

**Parámetros:**

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| `url` | string | url o html | URL de la página a analizar |
| `html` | string | url o html | Contenido HTML raw a analizar |
| `options.wcagLevel` | "A" \| "AA" \| "AAA" | No | Nivel WCAG a verificar (default: AA) |
| `options.rules` | string[] | No | IDs de reglas axe específicas a ejecutar |
| `options.excludeRules` | string[] | No | IDs de reglas axe a excluir |
| `options.includeIncomplete` | boolean | No | Incluir resultados "needs-review" (default: false) |
| `options.browser.waitForSelector` | string | No | Selector CSS a esperar antes del análisis |
| `options.browser.viewport` | object | No | Dimensiones del viewport |

**Ejemplo de respuesta:**

```json
{
  "success": true,
  "target": "https://example.com",
  "issueCount": 3,
  "issues": [
    {
      "id": "axe-0",
      "ruleId": "image-alt",
      "tool": "axe-core",
      "severity": "critical",
      "wcag": {
        "criterion": "1.1.1",
        "level": "A",
        "principle": "perceivable"
      },
      "location": {
        "selector": "img",
        "snippet": "<img src=\"logo.png\">"
      },
      "message": "Images must have alternate text",
      "affectedUsers": ["screen-reader"]
    }
  ],
  "summary": {
    "total": 3,
    "bySeverity": { "critical": 1, "serious": 2, "moderate": 0, "minor": 0 }
  },
  "duration": 1234
}
```

## Estructura del Proyecto

```
src/
├── server.ts           # Entry point MCP
├── adapters/
│   ├── base.ts         # Clase base para adaptadores
│   └── axe.ts          # Adaptador axe-core con Puppeteer
├── tools/
│   ├── base.ts         # Utilidades para tools MCP
│   └── axe.ts          # Tool analyze-with-axe
├── types/              # Schemas Zod (inputs, outputs, validación)
├── normalizers/        # Transformación a formato unificado
└── utils/              # Logger (pino → stderr)

tests/
├── adapters/           # Tests unitarios de adaptadores
├── tools/              # Tests de integración de tools
├── fixtures/           # HTML con problemas de accesibilidad conocidos
└── helpers/            # Utilidades para tests (mock server, etc.)
```

## Scripts

```bash
pnpm build          # Compila a dist/
pnpm dev            # Watch mode
pnpm typecheck      # Verifica tipos
pnpm start          # Levanta servidor
pnpm format         # Formatea código con Prettier
pnpm format:check   # Verifica formato
pnpm test           # Ejecuta tests
pnpm test:watch     # Tests en modo watch
pnpm test:coverage  # Tests con reporte de cobertura
pnpm inspect.       # Lanzar el inspector de mcp para debuggear herramientas de mcp
```

### Usar Claude Desktop o Cursor

Añade el servidor a tu configuración:

**Claude Desktop** (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "ai-ccesibility": {
      "command": "node",
      "args": ["<RUTA_AL_PROYECTO>/dist/server.js"],
      "env": {
        "LOG_LEVEL": "info"
      }
    }
  }
}
```

> ⚠️ Reemplaza `<RUTA_AL_PROYECTO>` con la ruta absoluta a tu proyecto (ej: `/Users/tu-usuario/Proyectos/ai-ccesibility`)

**Cursor** (`.cursor/mcp.json` en el directorio del proyecto):

```json
{
  "mcpServers": {
    "ai-ccesibility": {
      "command": "node",
      "args": ["dist/server.js"],
      "cwd": "<RUTA_AL_PROYECTO>"
    }
  }
}
```

> ⚠️ Reemplaza `<RUTA_AL_PROYECTO>` con la ruta absoluta a tu proyecto

Luego puedes usar prompts como:
- "Analiza la accesibilidad de https://example.com"
- "Revisa este HTML para problemas de accesibilidad: `<img src='foto.jpg'>`"

## Configuración

| Variable    | Default | Descripción                      |
|-------------|---------|----------------------------------|
| `LOG_LEVEL` | `info`  | `debug`, `info`, `warn`, `error` |

## Requisitos

- Node.js ≥ 20
- pnpm
- Chrome/Chromium (descargado automáticamente por Puppeteer)

## Dependencias Principales

- `@modelcontextprotocol/sdk` - SDK para servidores MCP
- `puppeteer` - Control de navegador headless
- `@axe-core/puppeteer` - Integración axe-core con Puppeteer
- `axe-core` - Motor de análisis de accesibilidad
- `zod` - Validación de schemas
- `pino` - Logging estructurado
