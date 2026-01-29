# AccesibilityHub

Servidor MCP para orquestación de herramientas de accesibilidad web (axe-core, Pa11y, eslint-plugin-vuejs-accessibility).

## 📑 Índice

- [📚 Documentación](#-documentación)
- [Herramientas Disponibles](#herramientas-disponibles)
  - [analyze-with-axe](#analyze-with-axe)
  - [analyze-with-pa11y](#analyze-with-pa11y)
  - [analyze-with-eslint](#analyze-with-eslint)
  - [analyze-contrast](#analyze-contrast)
  - [analyze-all ⭐](#analyze-all-)
- [Contexto Humano Enriquecido ✨](#contexto-humano-enriquecido-)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Scripts](#scripts)
- [Instalación](#instalación)
- [Configuración en Clientes MCP](#configuración-en-clientes-mcp)
  - [Claude Desktop](#claude-desktop)
  - [Cursor](#cursor)
  - [Windsurf](#windsurf)
  - [Claude Code](#claude-code)
- [Uso](#uso)
  - [Desarrollo Local](#desarrollo-local)
- [Configuración](#configuración)
- [Requisitos](#requisitos)
- [Dependencias Principales](#dependencias-principales)
- [Apóyame](#apóyame)

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/theraaskin)
[![Buy Me A Coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoffee.com/raskreation)

## 📚 Documentación

- **[USAGE.md](./USAGE.md)** - Guía completa de uso, workflows y prompts efectivos
- **[EXAMPLES.md](./EXAMPLES.md)** - Ejemplos concretos de inputs/outputs para cada herramienta



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

### `analyze-contrast`

Analiza una página web o contenido HTML para detectar problemas de contraste de color según WCAG 2.1.

**Parámetros:**

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| `url` | string | url o html | URL de la página a analizar |
| `html` | string | url o html | Contenido HTML raw a analizar |
| `options.wcagLevel` | "AA" \| "AAA" | No | Nivel WCAG: AA (4.5:1 normal, 3:1 grande) o AAA (7:1 normal, 4.5:1 grande). Default: AA |
| `options.suggestFixes` | boolean | No | Sugerir correcciones de color (default: true) |
| `options.includePassingElements` | boolean | No | Incluir elementos que pasan en los resultados (default: false) |
| `options.selector` | string | No | Selector CSS para limitar el análisis a un elemento específico |
| `options.browser.waitForSelector` | string | No | Selector CSS a esperar antes del análisis |
| `options.browser.viewport` | object | No | Dimensiones del viewport |
| `options.browser.ignoreHTTPSErrors` | boolean | No | Ignorar errores de certificado SSL (default: false) |

**Ejemplo de respuesta:**

```json
{
  "success": true,
  "target": "https://example.com",
  "wcagLevel": "AA",
  "issueCount": 2,
  "issues": [
    {
      "id": "contrast-0",
      "ruleId": "color-contrast",
      "tool": "contrast-analyzer",
      "severity": "serious",
      "wcag": {
        "criterion": "1.4.3",
        "level": "AA",
        "principle": "perceivable"
      },
      "location": {
        "selector": "p.subtitle",
        "snippet": "<p class=\"subtitle\">Texto de ejemplo</p>"
      },
      "message": "Contrast ratio 3.2:1 does not meet AA requirements (4.5:1 required for normal text)",
      "contrastData": {
        "foreground": "rgb(150, 150, 150)",
        "background": "rgb(255, 255, 255)",
        "currentRatio": 3.2,
        "requiredRatio": 4.5,
        "isLargeText": false,
        "fontSize": 16,
        "fontWeight": 400,
        "suggestedFix": {
          "foreground": "#767676",
          "background": "#ffffff",
          "newRatio": 4.54
        }
      },
      "affectedUsers": ["low-vision", "color-blind"]
    }
  ],
  "summary": {
    "total": 15,
    "passing": 13,
    "failing": 2,
    "byTextSize": {
      "normalText": { "passing": 10, "failing": 2 },
      "largeText": { "passing": 3, "failing": 0 }
    }
  },
  "duration": 1543
}
```

**Criterios WCAG:**
- 1.4.3 Contraste (Mínimo) - Nivel AA
- 1.4.6 Contraste (Mejorado) - Nivel AAA

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

## Contexto Humano Enriquecido ✨

Todos los issues incluyen automáticamente:

- **Descripción expandida** del criterio WCAG violado
- **Impacto en usuarios reales** con ejemplos concretos
- **Usuarios afectados** (screen-reader, keyboard-only, low-vision, etc.)
- **Prioridad de remediación** (critical, high, medium, low)
- **Esfuerzo de corrección** (low, medium, high)
- **Soluciones sugeridas** paso a paso

Ejemplo de issue enriquecido:
```json
{
  "ruleId": "image-alt",
  "severity": "serious",
  "humanContext": "**Contenido no textual (WCAG 1.1.1 - Nivel A)**\n\nLos usuarios de lectores de pantalla...",
  "suggestedActions": ["Añadir atributo alt descriptivo a imágenes", ...],
  "affectedUsers": ["screen-reader", "low-vision"],
  "priority": "critical",
  "remediationEffort": "low"
}
```

Los datos WCAG se mantienen en `src/data/wcag-criteria.json` y son fácilmente actualizables.

## Estructura del Proyecto

```
src/
├── server.ts           # Entry point MCP
├── data/
│   └── wcag-criteria.json  # Base de conocimiento WCAG (10 criterios)
├── adapters/
│   ├── base.ts         # Clase base para adaptadores
│   ├── axe.ts          # Adaptador axe-core con Puppeteer
│   ├── pa11y.ts        # Adaptador Pa11y
│   ├── eslint.ts       # Adaptador ESLint Vue a11y
│   └── contrast.ts     # Adaptador de análisis de contraste
├── tools/
│   ├── base.ts         # Utilidades para tools MCP
│   ├── axe.ts          # Tool analyze-with-axe
│   ├── pa11y.ts        # Tool analyze-with-pa11y
│   ├── eslint.ts       # Tool analyze-with-eslint
│   ├── contrast.ts     # Tool analyze-contrast
│   └── analyze-all.ts  # Tool de síntesis multi-herramienta
├── types/              # Schemas Zod (inputs, outputs, validación)
│   └── contrast.ts     # Tipos para análisis de contraste
├── normalizers/        # Transformación a formato unificado
└── utils/
    ├── logger.ts       # Logging estructurado
    ├── wcag-context.ts # Contexto WCAG
    └── color-analysis/ # Utilidades de análisis de color
        ├── contrast.ts   # Cálculo de ratios de contraste
        ├── converters.ts # Conversión entre formatos de color
        └── parsers.ts    # Parseo de colores CSS

tests/
├── adapters/           # Tests unitarios de adaptadores
│   └── contrast.test.ts
├── tools/              # Tests de integración de tools
├── fixtures/           # HTML con problemas de accesibilidad conocidos
├── helpers/            # Utilidades para tests (mock server, etc.)
└── utils/
    └── color-analysis/ # Tests de utilidades de color
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

## Instalación

```bash
npm install -g AccesibilityHub
```

O con pnpm:

```bash
pnpm add -g AccesibilityHub
```

## Configuración en Clientes MCP

### Claude Desktop

1. Abre el archivo de configuración:
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
   - **Linux**: `~/.config/Claude/claude_desktop_config.json`

2. Añade la configuración del servidor:

```json
{
  "mcpServers": {
    "AccesibilityHub": {
      "command": "npx",
      "args": ["-y", "AccesibilityHub"],
      "env": {
        "LOG_LEVEL": "info"
      }
    }
  }
}
```

3. Reinicia Claude Desktop

### Cursor

#### Instalación rápida con un clic

[<img src="https://cursor.com/deeplink/mcp-install-dark.svg" alt="Install in Cursor">](https://cursor.com/en/install-mcp?name=accessibility-hub&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsImFjY2Vzc2liaWxpdHktaHViIl19)

#### Instalación manual

1. Crea o edita el archivo `.cursor/mcp.json` en tu directorio de trabajo

2. Añade la configuración:

```json
{
  "mcpServers": {
    "AccesibilityHub": {
      "command": "npx",
      "args": ["-y", "AccesibilityHub"]
    }
  }
}
```

3. Reinicia Cursor

### Windsurf

1. Abre el archivo de configuración:
   - **macOS**: `~/Library/Application Support/Windsurf/mcp_config.json`
   - **Windows**: `%APPDATA%\Windsurf\mcp_config.json`
   - **Linux**: `~/.config/Windsurf/mcp_config.json`

2. Añade la configuración del servidor:

```json
{
  "mcpServers": {
    "AccesibilityHub": {
      "command": "npx",
      "args": ["-y", "AccesibilityHub"],
      "env": {
        "LOG_LEVEL": "info"
      }
    }
  }
}
```

3. Reinicia Windsurf

### Claude Code

1. Abre el archivo de configuración:
   - **macOS**: `~/Library/Application Support/Code/User/globalStorage/anthropic.claude-code/settings/cline_mcp_settings.json`
   - **Windows**: `%APPDATA%\Code\User\globalStorage\anthropic.claude-code\settings\cline_mcp_settings.json`
   - **Linux**: `~/.config/Code/User/globalStorage/anthropic.claude-code/settings/cline_mcp_settings.json`

2. Añade la configuración del servidor:

```json
{
  "mcpServers": {
    "AccesibilityHub": {
      "command": "npx",
      "args": ["-y", "AccesibilityHub"],
      "env": {
        "LOG_LEVEL": "info"
      }
    }
  }
}
```

3. Reinicia VS Code o recarga la ventana (Cmd/Ctrl + Shift + P → "Developer: Reload Window")

## Uso

Una vez configurado, puedes usar prompts como:

- "Analiza la accesibilidad de https://example.com con axe-core y Pa11y"
- "Revisa este HTML para problemas de accesibilidad: `<img src='foto.jpg'>`"
- "Analiza los archivos Vue en src/components/ para problemas de accesibilidad" (usa analyze-with-eslint)
- "Compara los resultados de axe-core y Pa11y en mi landing page" (usa analyze-all)
- "Verifica el contraste de colores de mi página web" (usa analyze-contrast)
- "Analiza si los colores de texto cumplen con WCAG AAA" (usa analyze-contrast con wcagLevel: AAA)

### Desarrollo Local

Si estás desarrollando o contribuyendo al proyecto, puedes usar rutas locales en lugar de npx:

**Claude Desktop / Windsurf / Claude Code**:
```json
{
  "mcpServers": {
    "AccesibilityHub": {
      "command": "node",
      "args": ["<RUTA_AL_PROYECTO>/dist/server.js"],
      "env": {
        "LOG_LEVEL": "debug"
      }
    }
  }
}
```

**Cursor**:
```json
{
  "mcpServers": {
    "AccesibilityHub": {
      "command": "node",
      "args": ["dist/server.js"],
      "cwd": "<RUTA_AL_PROYECTO>"
    }
  }
}
```

> 💡 **Tip**: Recuerda ejecutar `pnpm build` cada vez que hagas cambios en el código para que se reflejen en el servidor.

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
