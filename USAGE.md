# Guía de Uso - AccesibilityHub

Esta guía proporciona ejemplos prácticos de cómo usar las herramientas de accesibilidad desde Cursor o Claude Desktop.

## Contenido

- [Casos de Uso Comunes](#casos-de-uso-comunes)
- [Ejemplos por Herramienta](#ejemplos-por-herramienta)
- [Prompts Efectivos](#prompts-efectivos)
- [Interpretación de Resultados](#interpretación-de-resultados)
- [Workflows Recomendados](#workflows-recomendados)

---

## Casos de Uso Comunes

### 1. Auditoría Rápida de una Página Web

**Prompt:**
```
Analiza la accesibilidad de https://mi-sitio.com usando todas las herramientas disponibles
```

**¿Qué herramienta se usará?**  
→ `analyze-all` (axe-core + Pa11y en paralelo)

**Resultado esperado:**
- Issues combinados y deduplicados
- Agrupados por criterio WCAG
- Con contexto humano enriquecido

---

### 2. Análisis Profundo con una Herramienta Específica

**Prompt:**
```
Usa solo axe-core para analizar https://mi-sitio.com y dame un reporte detallado
```

**¿Qué herramienta se usará?**  
→ `analyze-with-axe`

**Ventaja:**  
Resultados más rápidos, metadata específica de axe-core.

---

### 3. Análisis de HTML Local o en Desarrollo

**Prompt:**
```
Revisa este HTML para problemas de accesibilidad:
<form>
  <input type="text" placeholder="Nombre">
  <button>Enviar</button>
</form>
```

**¿Qué herramienta se usará?**  
→ `analyze-all` o `analyze-with-axe`

**Issues típicos que encontrará:**
- Falta de `<label>` asociado al input (WCAG 1.3.1)
- Button sin `type="submit"` explícito

---

### 4. Linting Estático de Componentes Vue

**Prompt:**
```
Analiza los problemas de accesibilidad en src/components/LoginForm.vue
```

**¿Qué herramienta se usará?**  
→ `analyze-with-eslint`

**Issues típicos:**
- `v-if` en elementos interactivos sin `tabindex`
- Eventos `@click` sin `@keydown` equivalente
- Imágenes sin `alt`

---

### 5. Comparación de Herramientas

**Prompt:**
```
Compara los resultados de axe-core y Pa11y en https://ejemplo.com
¿Qué diferencias encuentran?
```

**¿Qué herramienta se usará?**  
→ `analyze-all` con campo `individualResults`

**Útil para:**
- Validar falsos positivos
- Entender diferencias entre herramientas
- Decisiones sobre qué tool usar en CI/CD

---

## Ejemplos por Herramienta

### `analyze-with-axe`

#### Ejemplo 1: Análisis básico
```
Analiza con axe-core: https://example.com
```

#### Ejemplo 2: Solo criterios WCAG AA
```
Analiza https://example.com con axe-core, nivel WCAG AA únicamente
```

#### Ejemplo 3: Esperar carga de contenido dinámico
```
Analiza https://spa-app.com con axe-core, esperando a que aparezca el selector #main-content
```

**Input equivalente:**
```json
{
  "url": "https://spa-app.com",
  "options": {
    "wcagLevel": "AA",
    "browser": {
      "waitForSelector": "#main-content"
    }
  }
}
```

---

### `analyze-with-pa11y`

#### Ejemplo 1: Análisis con warnings
```
Analiza https://example.com con Pa11y incluyendo warnings
```

#### Ejemplo 2: Solo errores críticos
```
Usa Pa11y para analizar https://example.com excluyendo warnings y notices
```

**Input equivalente:**
```json
{
  "url": "https://example.com",
  "options": {
    "standard": "WCAG21AA",
    "includeWarnings": false,
    "includeNotices": false
  }
}
```

---

### `analyze-with-eslint`

#### Ejemplo 1: Analizar archivo único
```
Revisa problemas de accesibilidad en src/components/Header.vue
```

#### Ejemplo 2: Analizar directorio completo
```
Analiza todos los archivos Vue en src/components/ para problemas de accesibilidad
```

#### Ejemplo 3: Código inline
```
¿Este componente Vue tiene problemas de accesibilidad?
<template>
  <div @click="handleClick">Click me</div>
</template>
```

**Issues esperados:**
- `no-static-element-interactions`: div no interactivo con evento click
- Falta de `role="button"` y manejo de teclado

---

### `analyze-all`

#### Ejemplo 1: Análisis completo
```
Haz un análisis completo de accesibilidad de https://mi-landing.com
```

#### Ejemplo 2: Sin deduplicación
```
Analiza https://example.com con axe-core y Pa11y, muéstrame TODOS los issues sin deduplicar
```

**Input equivalente:**
```json
{
  "url": "https://example.com",
  "tools": ["axe-core", "pa11y"],
  "options": {
    "deduplicateResults": false
  }
}
```

---

## Prompts Efectivos

### ✅ Buenos Prompts

#### Específicos y con contexto
```
Analiza la página de checkout en https://tienda.com/checkout 
y prioriza los issues que afecten a usuarios de lectores de pantalla
```

#### Con restricciones claras
```
Dame solo los issues críticos (severity: critical) de https://example.com
que tengan esfuerzo de corrección bajo (remediationEffort: low)
```

#### Solicitan interpretación
```
Analiza https://formulario.com y explícame cuáles son los 3 problemas
más urgentes de resolver y por qué
```

#### Con objetivos de negocio
```
Vamos a lanzar la web en 2 días. Analiza https://pre-prod.com 
y dime qué issues debo arreglar SÍ o SÍ antes del lanzamiento
```

---

### ❌ Prompts Mejorables

#### Demasiado vagos
```
¿Mi sitio es accesible?
```
**Mejor:** Especifica la URL y qué aspectos te preocupan.

#### Sin contexto de acción
```
Analiza https://example.com
```
**Mejor:** Añade qué quieres hacer con los resultados.

#### Mezclando tipos de análisis
```
Analiza https://example.com y también src/components/*.vue
```
**Mejor:** Haz dos análisis separados (web vs código fuente).

---

## Interpretación de Resultados

### Campos Clave en los Issues

```json
{
  "ruleId": "image-alt",
  "severity": "serious",
  "wcag": {
    "criterion": "1.1.1",
    "level": "A",
    "principle": "perceivable"
  },
  "priority": "critical",
  "remediationEffort": "low",
  "affectedUsers": ["screen-reader", "low-vision"]
}
```

### Cómo Priorizar

#### Matriz de Priorización

| Priority | Effort | Acción |
|----------|--------|--------|
| **Critical** | **Low** | 🔥 **Fix inmediatamente** |
| **Critical** | Medium/High | 📅 Planificar para próximo sprint |
| **High** | **Low** | ✅ Quick wins - hacer pronto |
| Medium/Low | High | 📝 Backlog - evaluar vs impacto |

#### Ejemplo de Triage

**Prompt:**
```
Del análisis anterior, muéstrame:
1. Issues críticos con esfuerzo bajo (arreglar hoy)
2. Issues high con esfuerzo bajo (arreglar esta semana)
3. El resto agrupado por principio WCAG
```

---

## Workflows Recomendados

### Workflow 1: Pre-Deploy Check

```
1. Analiza https://staging.mi-app.com con todas las herramientas
2. Filtra solo issues críticos y de alto impacto
3. Si hay issues críticos → bloquear deploy
4. Si solo hay issues medium/low → registrar en backlog y deployar
```

**Prompt sugerido:**
```
Analiza staging.mi-app.com y dime si hay algún issue crítico 
que justifique retrasar el deploy
```

---

### Workflow 2: Code Review de PRs

```
1. Desarrollador crea PR con cambios en componentes Vue
2. Analizar archivos modificados con ESLint
3. Si hay issues severity serious/critical → request changes
4. Si solo hay warnings → aprobar con comentarios
```

**Prompt sugerido:**
```
Analiza estos componentes modificados en el PR:
- src/components/PaymentForm.vue
- src/components/AddressInput.vue

¿Hay algo que deba corregirse antes de hacer merge?
```

---

### Workflow 3: Auditoría Periódica

```
1. Cada sprint, analizar la web de producción
2. Comparar con análisis anterior
3. Identificar regresiones (nuevos issues)
4. Priorizar fixes para próximo sprint
```

**Prompt sugerido:**
```
Analiza https://produccion.com y compara con el análisis 
del mes pasado. ¿Hemos introducido nuevos problemas?
```

---

### Workflow 4: Formación del Equipo

```
1. Analizar una página con issues variados
2. Revisar campo humanContext de cada issue
3. Entender ejemplos del mundo real
4. Aplicar soluciones sugeridas (suggestedActions)
```

**Prompt sugerido:**
```
Analiza https://demo.com y explícame en detalle 
el issue WCAG 1.1.1 (Contenido no textual):
- Qué usuarios afecta
- Ejemplo real de cómo les impacta
- Cómo corregirlo paso a paso
```

---

## Tips Avanzados

### 1. Análisis de SPA con Lazy Loading

```json
{
  "url": "https://spa-app.com",
  "options": {
    "browser": {
      "waitForSelector": "[data-loaded='true']",
      "waitForTimeout": 5000
    }
  }
}
```

### 2. Viewport Móvil

```json
{
  "url": "https://responsive-site.com",
  "options": {
    "browser": {
      "viewport": {
        "width": 375,
        "height": 667
      }
    }
  }
}
```

### 3. Excluir Reglas Específicas

Útil si tienes un falso positivo conocido:

```json
{
  "url": "https://example.com",
  "options": {
    "excludeRules": ["color-contrast"]
  }
}
```

---

## Preguntas Frecuentes

### ¿Qué herramienta usar en CI/CD?

- **Para web deployada:** `analyze-all` (cobertura máxima)
- **Para código Vue:** `analyze-with-eslint` (rápido, sin browser)

### ¿Cómo manejar falsos positivos?

1. Verifica con segunda herramienta
2. Revisa `confidence` score (< 0.8 puede ser falso positivo)
3. Usa `excludeRules` si es falso positivo confirmado

### ¿Puedo analizar sitios con login?

Actualmente no. Las herramientas analizan la página pública. Para análisis autenticado, considera:
- Configurar browser compartido con cookies
- Usar HTML capturado post-login

---

## Ejemplos de Respuestas Típicas

### Respuesta con Context Enriquecido

```json
{
  "ruleId": "image-alt",
  "message": "Images must have alternate text",
  "humanContext": "**Contenido no textual (WCAG 1.1.1 - Nivel A)**\n\nTodo contenido no textual debe tener una alternativa de texto que cumpla el mismo propósito.\n\n**Impacto en usuarios:**\nLos usuarios de lectores de pantalla no pueden acceder a la información transmitida por imágenes...",
  "suggestedActions": [
    "Añadir atributo alt descriptivo a imágenes",
    "Usar aria-label para iconos decorativos con función"
  ],
  "affectedUsers": ["screen-reader", "low-vision"],
  "priority": "critical",
  "remediationEffort": "low"
}
```

### Issues Agrupados por WCAG

```json
{
  "issuesByWCAG": {
    "1.1.1": [
      { "ruleId": "image-alt", ... },
      { "ruleId": "input-image-alt", ... }
    ],
    "2.1.1": [
      { "ruleId": "button-name", ... }
    ]
  }
}
```

---

## Recursos Adicionales

- **WCAG Quick Reference:** https://www.w3.org/WAI/WCAG21/quickref/
- **MDN Accessibility:** https://developer.mozilla.org/en-US/docs/Web/Accessibility
- **WAI-ARIA Authoring Practices:** https://www.w3.org/WAI/ARIA/apg/

---

¿Tienes dudas? Revisa el [README.md](./README.md) o abre un issue en el repositorio.
