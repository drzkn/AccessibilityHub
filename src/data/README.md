# WCAG Criteria Data

Este directorio contiene la base de conocimiento de criterios WCAG utilizada para enriquecer los issues de accesibilidad con contexto humano.

## Archivo: `wcag-criteria.json`

Contiene información detallada de criterios WCAG 2.1 Level A/AA, incluyendo:

- **Descripción técnica** del criterio
- **Impacto en usuarios reales** (screen readers, keyboard-only, etc.)
- **Ejemplos del mundo real**
- **Prioridad de remediación** (critical, high, medium, low)
- **Esfuerzo de corrección** (low, medium, high)
- **Soluciones comunes** paso a paso

## Estructura de cada criterio:

```json
{
  "X.Y.Z": {
    "criterion": "X.Y.Z",
    "level": "A" | "AA" | "AAA",
    "principle": "perceivable" | "operable" | "understandable" | "robust",
    "title": "Título del criterio",
    "description": "Descripción técnica",
    "userImpact": {
      "affectedUsers": ["screen-reader", "keyboard-only", ...],
      "impactDescription": "Explicación del impacto",
      "realWorldExample": "Ejemplo concreto"
    },
    "remediation": {
      "effort": "low" | "medium" | "high",
      "priority": "critical" | "high" | "medium" | "low",
      "commonSolutions": ["Solución 1", "Solución 2", ...]
    },
    "wcagUrl": "https://www.w3.org/WAI/WCAG21/Understanding/..."
  }
}
```

## Cómo actualizar o añadir criterios:

### 1. Añadir un nuevo criterio WCAG

```json
{
  "2.5.3": {
    "criterion": "2.5.3",
    "level": "A",
    "principle": "operable",
    "title": "Label in Name",
    "description": "...",
    "userImpact": { ... },
    "remediation": { ... },
    "wcagUrl": "https://www.w3.org/WAI/WCAG21/Understanding/label-in-name.html"
  }
}
```

### 2. Actualizar para WCAG 2.2 o 3.0

Simplemente añade los nuevos criterios al archivo JSON siguiendo la misma estructura.

### 3. Traducción a otros idiomas

Puedes crear archivos adicionales:
- `wcag-criteria.en.json` (inglés)
- `wcag-criteria.es.json` (español, actual)
- `wcag-criteria.fr.json` (francés)

Y cargar dinámicamente según el idioma configurado.

## Referencias:

- **WCAG 2.1 oficial**: https://www.w3.org/WAI/WCAG21/quickref/
- **Understanding WCAG**: https://www.w3.org/WAI/WCAG21/Understanding/
- **Techniques**: https://www.w3.org/WAI/WCAG21/Techniques/

## Criterios actualmente documentados:

- ✅ 1.1.1 - Contenido no textual (A)
- ✅ 1.2.2 - Subtítulos (A)
- ✅ 1.3.1 - Información y relaciones (A)
- ✅ 1.4.3 - Contraste mínimo (AA)
- ✅ 2.1.1 - Teclado (A)
- ✅ 2.4.1 - Saltar bloques (A)
- ✅ 2.4.3 - Orden del foco (A)
- ✅ 2.4.4 - Propósito de los enlaces (A)
- ✅ 3.2.2 - Al recibir entradas (A)
- ✅ 4.1.2 - Nombre, función, valor (A)

## Roadmap:

- [ ] Completar todos los criterios Level A
- [ ] Completar todos los criterios Level AA
- [ ] Añadir criterios WCAG 2.2
- [ ] Soporte multi-idioma
- [ ] Validación con JSON Schema
