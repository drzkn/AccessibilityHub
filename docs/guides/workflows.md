# Workflows

Recommended workflows for common accessibility tasks.

## Table of Contents

- [Common Use Cases](#common-use-cases)
- [Recommended Workflows](#recommended-workflows)

---

## Common Use Cases

### 1. Quick Page Audit

**Prompt:**
```
Analyze the accessibility of https://my-site.com using all available tools
```

**Which tool will be used?**  
→ `analyze-mixed` (axe-core + Pa11y in parallel)

**Expected result:**
- Combined and deduplicated issues
- Grouped by WCAG criterion
- With enriched human context

---

### 2. Deep Analysis with a Specific Tool

**Prompt:**
```
Use only axe-core to analyze https://my-site.com and give me a detailed report
```

**Which tool will be used?**  
→ `analyze-with-axe`

**Advantage:**  
Faster results, axe-core specific metadata.

---

### 3. Local or Development HTML Analysis

**Prompt:**
```
Check this HTML for accessibility issues:
<form>
  <input type="text" placeholder="Name">
  <button>Submit</button>
</form>
```

**Which tool will be used?**  
→ `analyze-mixed` or `analyze-with-axe`

**Typical issues it will find:**
- Missing `<label>` associated with input (WCAG 1.3.1)
- Button without explicit `type="submit"`

---

### 4. Tool Comparison

**Prompt:**
```
Compare the results of axe-core and Pa11y on https://example.com
What differences do they find?
```

**Which tool will be used?**  
→ `analyze-mixed` with `individualResults` field

**Useful for:**
- Validating false positives
- Understanding differences between tools
- Decisions about which tool to use in CI/CD

---

### 5. Color Contrast Analysis

**Prompt:**
```
Check if the text colors on https://my-site.com comply with WCAG AA
```

**Which tool will be used?**  
→ `analyze-contrast`

**Expected result:**
- Current contrast ratio vs required
- Color suggestions that comply with WCAG
- Statistics by text type (normal/large)

---

### 6. APCA Analysis (WCAG 3.0 Draft)

**Prompt:**
```
Analyze the contrast of https://my-site.com using the APCA algorithm
```

**Which tool will be used?**  
→ `analyze-contrast` with `contrastAlgorithm: "APCA"`

**Expected result:**
- Lightness contrast (Lc) instead of ratios
- Thresholds: 75Lc (body text), 60Lc (large text), 45Lc (non-text)
- Color suggestions optimized for visual perception

---

## Recommended Workflows

### Workflow 1: Pre-Deploy Check

```
1. Analyze https://staging.my-app.com with all tools
2. Filter only critical and high impact issues
3. If there are critical issues → block deploy
4. If only medium/low issues → log in backlog and deploy
```

**Using the MCP Prompt (recommended):**
```
Use the pre-deploy-check prompt for https://staging.my-app.com
```

This will provide a clear GO/NO-GO decision with blocking issues highlighted.

**Alternative - direct prompt:**
```
Analyze staging.my-app.com and tell me if there are any critical issues 
that justify delaying the deploy
```

---

### Workflow 2: Quick Wins Sprint Planning

```
1. Identify high-impact, low-effort accessibility fixes
2. Create sprint tasks with time estimates
3. Track improvements over time
```

**Using the MCP Prompt (recommended):**
```
Use the quick-wins-report prompt for https://my-site.com
```

This will provide a priority-ordered list with time estimates and a copyable checklist.

---

### Workflow 3: Periodic Audit

```
1. Each sprint, analyze the production website
2. Compare with previous analysis
3. Identify regressions (new issues)
4. Prioritize fixes for next sprint
```

**Using the MCP Prompt:**
```
Use the full-accessibility-audit prompt with:
- url: https://production.com
- wcagLevel: AA
```

**Alternative prompt for comparison:**
```
Analyze https://production.com and compare with last 
month's analysis. Have we introduced new problems?
```

---

### Workflow 4: Team Training

```
1. Analyze a page with varied issues
2. Review the humanContext field of each issue
3. Understand real-world examples
4. Apply suggested solutions (suggestedActions)
```

**Using the MCP Prompt (recommended):**
```
Use the explain-wcag-criterion prompt with criterion: 1.1.1
```

This provides an in-depth educational explanation with code examples.

**Alternative - analysis with explanation:**
```
Analyze https://demo.com and explain in detail 
the WCAG 1.1.1 issue (Non-text content):
- Which users it affects
- Real example of how it impacts them
- How to fix it step by step
```

---

### Workflow 5: Focused Contrast Review

```
1. Analyze color contrast for specific sections
2. Get suggested color fixes
3. Apply changes and re-verify
```

**Using the MCP Prompt:**
```
Use the contrast-check prompt with:
- url: https://my-site.com
- selector: .hero-section
- algorithm: WCAG21
- wcagLevel: AAA
```

This provides detailed contrast analysis with CSS fix suggestions.

---

## Related

- [Effective Prompts](./effective-prompts.md) - Tips for writing better accessibility prompts
- [Interpreting Results](./interpreting-results.md) - How to prioritize findings
- [Tools Reference](../tools/README.md) - Detailed tool documentation
- [Prompts Reference](../prompts/README.md) - Available MCP prompts
