# Interpreting Results

How to understand, prioritize, and act on accessibility analysis findings.

## Table of Contents

- [Key Fields in Issues](#key-fields-in-issues)
- [How to Prioritize](#how-to-prioritize)
- [Advanced Tips](#advanced-tips)
- [Tool Comparison](#tool-comparison)
- [Frequently Asked Questions](#frequently-asked-questions)

---

## Key Fields in Issues

Every issue returned by the tools includes fields that help you understand and prioritize:

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
  "affectedUsers": ["screen-reader", "low-vision"],
  "humanContext": "**Non-text content (WCAG 1.1.1 - Level A)**\n\nAll non-text content must have a text alternative...",
  "suggestedActions": [
    "Add descriptive alt attribute to images",
    "Use aria-label for decorative icons with function"
  ]
}
```

### Field Descriptions

| Field | Purpose |
|-------|---------|
| `ruleId` | Unique identifier for the accessibility rule |
| `severity` | Issue severity: `critical`, `serious`, `moderate`, `minor` |
| `wcag.criterion` | WCAG success criterion (e.g., 1.1.1, 2.4.4) |
| `wcag.level` | Conformance level: A, AA, or AAA |
| `priority` | Suggested fix priority based on impact |
| `remediationEffort` | Estimated effort: `low`, `medium`, `high` |
| `affectedUsers` | User groups impacted by this issue |
| `humanContext` | Human-readable explanation of the requirement |
| `suggestedActions` | Specific steps to fix the issue |

---

## How to Prioritize

### Prioritization Matrix

| Priority | Effort | Action |
|----------|--------|--------|
| **Critical** | **Low** | 🔥 **Fix immediately** |
| **Critical** | Medium/High | 📅 Plan for next sprint |
| **High** | **Low** | ✅ Quick wins - do soon |
| Medium/Low | High | 📝 Backlog - evaluate vs impact |

### Triage Example

**Prompt:**
```
From the previous analysis, show me:
1. Critical issues with low effort (fix today)
2. High issues with low effort (fix this week)
3. The rest grouped by WCAG principle
```

### Tips for Prioritization

#### 1. Prioritize by Matrix

```
Critical + Low effort = Fix TODAY
Critical + Medium/High effort = Plan for sprint
High + Low effort = Quick wins
Medium/Low + High effort = Backlog
```

#### 2. Validate Duplicates

If `deduplicatedCount` > `issueCount` in analyze-mixed results, check `individualResults` to see which tool is more reliable for that type of issue.

#### 3. Review `affectedUsers`

Prioritize issues that affect screen reader and keyboard-only users (most common assistive technology users).

#### 4. Leverage `humanContext`

Read the real-world examples to understand the actual impact on users.

---

## Advanced Tips

### 1. SPA Analysis with Lazy Loading

For single-page applications with dynamic content:

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

### 2. Mobile Viewport Analysis

Test responsive layouts:

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

### 3. Exclude Specific Rules

Useful if you have a known false positive:

```json
{
  "url": "https://example.com",
  "options": {
    "excludeRules": ["color-contrast"]
  }
}
```

### 4. Contrast Analysis with AAA Level

For projects requiring maximum accessibility:

```json
{
  "url": "https://example.com",
  "options": {
    "wcagLevel": "AAA",
    "suggestFixes": true
  }
}
```

**Required ratios:**
- **AA:** 4.5:1 (normal text), 3:1 (large text)
- **AAA:** 7:1 (normal text), 4.5:1 (large text)

### 5. Specific Section Contrast

Analyze only a part of the page:

```json
{
  "url": "https://example.com",
  "options": {
    "selector": ".hero-section",
    "includePassingElements": false
  }
}
```

### 6. APCA Analysis (WCAG 3.0 Draft)

For projects preparing for WCAG 3.0:

```json
{
  "url": "https://example.com",
  "options": {
    "contrastAlgorithm": "APCA",
    "suggestFixes": true
  }
}
```

**APCA vs WCAG21 differences:**
- **APCA** measures "lightness contrast" (Lc), more perceptually accurate
- **APCA** considers polarity (light text on dark vs dark text on light)
- **APCA** is experimental (WCAG 3.0 draft)
- **WCAG21** remains the current legal/regulatory standard

---

## Tool Comparison

### Same Issue Detected by Different Tools

**Axe-core:**
```json
{
  "tool": "axe-core",
  "ruleId": "image-alt",
  "severity": "critical",
  "location": {
    "selector": "img:nth-child(2)"
  },
  "message": "Images must have alternate text"
}
```

**Pa11y:**
```json
{
  "tool": "pa11y",
  "ruleId": "WCAG2AA.Principle1.Guideline1_1.1_1_1.H37",
  "severity": "serious",
  "location": {
    "selector": "html > body > img:nth-child(2)"
  },
  "message": "Img element missing an alt attribute..."
}
```

### Differences Summary

| Feature | axe-core | Pa11y | Contrast |
|---------|----------|-------|----------|
| **Target** | URL/HTML | URL/HTML | URL/HTML |
| **Selector** | Compact CSS | Full CSS | Compact CSS |
| **Severities** | 4 levels | 3 types | 4 levels |
| **Snippet** | ✅ | ✅ | ✅ |
| **Confidence** | ✅ | ✅ | Always 1 |
| **Browser** | Puppeteer | Puppeteer | Puppeteer |
| **Speed** | ~2-3s | ~2s | ~1-2s |
| **False positives** | Few | Moderate | Very few |
| **Fix suggestions** | - | - | ✅ Colors |
| **APCA (WCAG 3.0)** | - | - | ✅ Experimental |

---

## Frequently Asked Questions

### Which tool to use in CI/CD?

- **For deployed web:** `analyze-mixed` (maximum coverage)
- **For color verification:** `analyze-contrast` (with fix suggestions)

### How to handle false positives?

1. Verify with a second tool
2. Check `confidence` score (< 0.8 may be a false positive)
3. Use `excludeRules` if confirmed as a false positive

### Can I analyze sites with login?

Currently no. The tools analyze the public page. For authenticated analysis, consider:
- Configuring a shared browser with cookies
- Using HTML captured post-login

### What are MCP Resources used for?

Resources provide **reference data** that complements the analysis tools:
- **WCAG criteria lookup**: Get detailed info about any WCAG criterion
- **Contrast thresholds**: Quick reference for required contrast ratios
- **Algorithm comparison**: Understand WCAG21 vs APCA differences

Resources are read-only and don't require any input—they just expose accessibility knowledge that can be queried directly.

### What do the severity levels mean?

| Severity | Meaning |
|----------|---------|
| **Critical** | Blocks users entirely from completing tasks |
| **Serious** | Significantly hinders users, major barriers |
| **Moderate** | Some difficulty, but workarounds exist |
| **Minor** | Annoyance but doesn't prevent access |

### How often should I run accessibility checks?

| Scenario | Frequency |
|----------|-----------|
| During development | Every feature branch |
| Pre-deployment | Every release |
| Production monitoring | Weekly or sprint-based |
| After major redesigns | Comprehensive audit |

---

## Related

- [Workflows](./workflows.md) - Recommended workflows for common tasks
- [Effective Prompts](./effective-prompts.md) - Tips for better prompts
- [Tools Reference](../tools/README.md) - Detailed tool documentation
- [WCAG Criteria](../resources/wcag-criteria.md) - WCAG reference data
