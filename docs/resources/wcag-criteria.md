# WCAG Criteria Resource

Reference data for WCAG 2.1 success criteria, providing detailed information about each criterion including level, principle, description, and affected users.

## URI Patterns

| URI | Description |
|-----|-------------|
| `wcag://criteria` | Complete list of all WCAG 2.1 criteria |
| `wcag://criteria/{id}` | Specific criterion (e.g., `wcag://criteria/1.4.3`) |
| `wcag://criteria/level/{level}` | Filter by level: `A`, `AA`, or `AAA` |
| `wcag://criteria/principle/{principle}` | Filter by POUR principle |

## Available Principles

| Principle | URI | Description |
|-----------|-----|-------------|
| Perceivable | `wcag://criteria/principle/perceivable` | Information must be presentable to users |
| Operable | `wcag://criteria/principle/operable` | UI components must be operable |
| Understandable | `wcag://criteria/principle/understandable` | Information and UI must be understandable |
| Robust | `wcag://criteria/principle/robust` | Content must be robust for assistive technologies |

## Response Format

Each criterion returns a structured object:

```json
{
  "id": "1.4.3",
  "title": "Contrast (Minimum)",
  "level": "AA",
  "principle": "perceivable",
  "guideline": "1.4",
  "description": "The visual presentation of text has a contrast ratio of at least 4.5:1",
  "affectedUsers": ["low-vision", "color-blind"],
  "suggestedActions": ["Ensure text has sufficient contrast against background"]
}
```

### Field Descriptions

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | WCAG criterion identifier (e.g., "1.4.3") |
| `title` | string | Official criterion title |
| `level` | string | Conformance level: A, AA, or AAA |
| `principle` | string | POUR principle |
| `guideline` | string | Parent guideline ID |
| `description` | string | Brief explanation of the requirement |
| `affectedUsers` | string[] | User groups impacted by violations |
| `suggestedActions` | string[] | Remediation recommendations |

## Examples

### Get a Specific Criterion

```
Resource: wcag://criteria/1.4.3
```

**Response:**

```json
{
  "id": "1.4.3",
  "title": "Contrast (Minimum)",
  "level": "AA",
  "principle": "perceivable",
  "guideline": "1.4",
  "description": "The visual presentation of text has a contrast ratio of at least 4.5:1",
  "affectedUsers": ["low-vision", "color-blind"],
  "suggestedActions": ["Ensure text has sufficient contrast against background"]
}
```

### Get All Level AA Criteria

```
Resource: wcag://criteria/level/AA
```

Returns an array of all 20 Level AA criteria.

### Get All Perceivable Criteria

```
Resource: wcag://criteria/principle/perceivable
```

Returns all criteria under the Perceivable principle (Guidelines 1.1-1.4).

## Common Criteria Quick Reference

### Level A (Must Have)

| ID | Title | Affected Users |
|----|-------|----------------|
| 1.1.1 | Non-text Content | screen-reader, low-vision |
| 1.3.1 | Info and Relationships | screen-reader |
| 2.1.1 | Keyboard | motor-impairment, keyboard-only |
| 2.4.1 | Bypass Blocks | screen-reader, keyboard-only |
| 4.1.2 | Name, Role, Value | screen-reader |

### Level AA (Should Have)

| ID | Title | Affected Users |
|----|-------|----------------|
| 1.4.3 | Contrast (Minimum) | low-vision, color-blind |
| 1.4.4 | Resize Text | low-vision |
| 2.4.6 | Headings and Labels | screen-reader, cognitive |
| 2.4.7 | Focus Visible | keyboard-only |

### Level AAA (Nice to Have)

| ID | Title | Affected Users |
|----|-------|----------------|
| 1.4.6 | Contrast (Enhanced) | low-vision |
| 2.4.9 | Link Purpose (Link Only) | screen-reader |
| 3.1.5 | Reading Level | cognitive |

## Programmatic Access

```typescript
const criterion = await client.readResource({ 
  uri: 'wcag://criteria/1.4.3' 
});

const aaCriteria = await client.readResource({ 
  uri: 'wcag://criteria/level/AA' 
});

const perceivableCriteria = await client.readResource({ 
  uri: 'wcag://criteria/principle/perceivable' 
});
```

## Use with Tools

WCAG criteria resources complement the analysis tools:

1. **Run analysis**: Use `analyze-with-axe` or `analyze-mixed` to find issues
2. **Look up criterion**: Use `wcag://criteria/{id}` to understand each issue
3. **Prioritize fixes**: Use `affectedUsers` and `level` to prioritize remediation

**Example workflow:**

```
1. Analyze https://example.com with axe-core
2. For each issue with wcag.criterion "1.4.3", 
   look up wcag://criteria/1.4.3 for context
3. Apply suggestedActions from the resource
```

## Related Resources

- [Contrast Thresholds](./contrast-thresholds.md) - Specific contrast ratio requirements
- [Prompts Reference](../prompts/README.md) - `explain-wcag-criterion` prompt for deep dives
