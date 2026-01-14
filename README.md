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

### `analyze-with-pa11y`

Analiza una página web o contenido HTML usando Pa11y.

**Parámetros similares a axe**, con `options.standard` para elegir el estándar WCAG (WCAG2AA, WCAG21AA, etc.).

### `analyze-with-eslint`

Analiza archivos Vue.js para problemas de accesibilidad mediante análisis estático.

**Parámetros:**
- `files`: Array de rutas de archivos .vue
- `directory`: Directorio a analizar recursivamente
- `code`: Código Vue inline a analizar

### `analyze-all` ⭐

**Tool de síntesis para análisis web** que ejecuta axe-core y Pa11y en paralelo y combina los resultados.

**Parámetros:**
- `url` o `html`: Target web a analizar (requerido)
- `tools`: Array de tools a ejecutar (default: `['axe-core', 'pa11y']`)
- `options.deduplicateResults`: Eliminar issues duplicados (default: `true`)
- `options.wcagLevel`: Nivel WCAG (default: `'AA'`)

**Respuesta incluye:**
- `issues`: Issues combinados y deduplicados
- `issuesByWCAG`: Issues agrupados por criterio WCAG
- `summary.byTool`: Conteo de issues por herramienta
- `individualResults`: Resultados completos de cada tool
- `deduplicatedCount`: Número de duplicados eliminados

**Nota:** Para análisis de código Vue, usa `analyze-with-eslint` por separado. Esta herramienta está especializada en análisis web dinámico.

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
- "Analiza la accesibilidad de https://example.com con axe-core y Pa11y"
- "Revisa este HTML para problemas de accesibilidad: `<img src='foto.jpg'>`"
- "Analiza los archivos Vue en src/components/ para problemas de accesibilidad" (usa analyze-with-eslint)
- "Compara los resultados de axe-core y Pa11y en mi landing page" (usa analyze-all)

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
- `pa11y` - Herramienta de testing de accesibilidad
- `eslint` + `eslint-plugin-vuejs-accessibility` - Linting estático de Vue.js
- `zod` - Validación de schemas
- `pino` - Logging estructurado
