# Contrast Thresholds Resource

Reference data for color contrast requirements, supporting both WCAG 2.1 standard ratios and APCA (Accessible Perceptual Contrast Algorithm) lightness values.

## URI Patterns

| URI | Description |
|-----|-------------|
| `contrast://thresholds/wcag21` | WCAG 2.1 contrast ratio requirements |
| `contrast://thresholds/apca` | APCA (WCAG 3.0 draft) lightness thresholds |
| `contrast://algorithms` | List of supported algorithms with descriptions |

## WCAG 2.1 Thresholds

```
Resource: contrast://thresholds/wcag21
```

**Response:**

```json
{
  "AA_NORMAL": { 
    "ratio": 4.5, 
    "description": "Normal text (< 18pt or < 14pt bold)" 
  },
  "AA_LARGE": { 
    "ratio": 3.0, 
    "description": "Large text (>= 18pt or >= 14pt bold)" 
  },
  "AAA_NORMAL": { 
    "ratio": 7.0, 
    "description": "Enhanced contrast for normal text" 
  },
  "AAA_LARGE": { 
    "ratio": 4.5, 
    "description": "Enhanced contrast for large text" 
  },
  "NON_TEXT": { 
    "ratio": 3.0, 
    "description": "UI components and graphical objects" 
  }
}
```

### WCAG 2.1 Quick Reference

| Level | Text Size | Required Ratio | Criterion |
|-------|-----------|----------------|-----------|
| AA | Normal (< 18pt) | 4.5:1 | 1.4.3 |
| AA | Large (≥ 18pt) | 3:1 | 1.4.3 |
| AA | Non-text (UI) | 3:1 | 1.4.11 |
| AAA | Normal (< 18pt) | 7:1 | 1.4.6 |
| AAA | Large (≥ 18pt) | 4.5:1 | 1.4.6 |

### What is "Large Text"?

- **18pt or larger** (24px)
- **14pt bold or larger** (18.5px bold)

## APCA Thresholds

APCA (Accessible Perceptual Contrast Algorithm) is part of the WCAG 3.0 draft. It uses **Lightness Contrast (Lc)** values instead of ratios.

```
Resource: contrast://thresholds/apca
```

**Response:**

```json
{
  "BODY_TEXT": { 
    "ratio": 75, 
    "description": "Body text (fluent reading)" 
  },
  "LARGE_TEXT": { 
    "ratio": 60, 
    "description": "Large text (headings, titles)" 
  },
  "NON_TEXT": { 
    "ratio": 45, 
    "description": "Non-text elements (icons, borders)" 
  }
}
```

### APCA Quick Reference

| Use Case | Minimum Lc | Examples |
|----------|-----------|----------|
| Body text | 75 Lc | Paragraphs, articles, content |
| Large text | 60 Lc | Headings, titles, hero text |
| Non-text | 45 Lc | Icons, borders, focus rings |
| Placeholder | 60 Lc | Input placeholders |
| Disabled | 30 Lc | Disabled states (informational) |

## WCAG 2.1 vs APCA

```
Resource: contrast://algorithms
```

**Response:**

```json
{
  "wcag21": {
    "name": "WCAG 2.1",
    "description": "Standard luminance contrast ratio",
    "status": "W3C Recommendation",
    "unit": "ratio (e.g., 4.5:1)"
  },
  "apca": {
    "name": "APCA",
    "description": "Accessible Perceptual Contrast Algorithm",
    "status": "WCAG 3.0 Draft",
    "unit": "Lightness Contrast (Lc)"
  }
}
```

### Key Differences

| Aspect | WCAG 2.1 | APCA |
|--------|----------|------|
| **Measurement** | Luminance ratio | Lightness contrast (Lc) |
| **Formula** | (L1 + 0.05) / (L2 + 0.05) | Complex perceptual model |
| **Polarity** | Same result either way | Different for dark-on-light vs light-on-dark |
| **Accuracy** | Good approximation | More perceptually accurate |
| **Status** | Current standard | Experimental (WCAG 3.0 draft) |
| **Legal standing** | Widely adopted | Not yet official |

### When to Use Each

| Scenario | Recommended Algorithm |
|----------|----------------------|
| Legal compliance requirements | WCAG 2.1 |
| Regulatory audits | WCAG 2.1 |
| Future-proofing designs | Test both |
| Dark mode optimization | APCA |
| Fine-tuning color palettes | APCA |
| General accessibility testing | WCAG 2.1 |

## Examples

### Check WCAG AA Requirements

```
What contrast ratio do I need for normal body text to meet WCAG AA?
→ Resource: contrast://thresholds/wcag21
→ Answer: 4.5:1 (AA_NORMAL)
```

### Check APCA Requirements

```
What Lc value do I need for heading text in APCA?
→ Resource: contrast://thresholds/apca
→ Answer: 60 Lc (LARGE_TEXT)
```

### Compare Algorithms

```
Should I use WCAG 2.1 or APCA for my project?
→ Resource: contrast://algorithms
→ WCAG 2.1 for legal compliance, APCA for perceptual accuracy
```

## Programmatic Access

```typescript
const wcag21Thresholds = await client.readResource({ 
  uri: 'contrast://thresholds/wcag21' 
});

const apcaThresholds = await client.readResource({ 
  uri: 'contrast://thresholds/apca' 
});

const algorithms = await client.readResource({ 
  uri: 'contrast://algorithms' 
});
```

## Use with Tools

The `analyze-contrast` tool uses these thresholds automatically:

```json
{
  "url": "https://example.com",
  "options": {
    "contrastAlgorithm": "WCAG21",
    "wcagLevel": "AA"
  }
}
```

For APCA analysis:

```json
{
  "url": "https://example.com",
  "options": {
    "contrastAlgorithm": "APCA"
  }
}
```

## Related Resources

- [WCAG Criteria](./wcag-criteria.md) - Full WCAG criterion details (1.4.3, 1.4.6, 1.4.11)
- [analyze-contrast Tool](../tools/analyze-contrast.md) - Automated contrast analysis
- [contrast-check Prompt](../prompts/contrast-check.md) - Guided contrast workflow
