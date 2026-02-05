# Effective Prompts

Tips and examples for writing effective accessibility analysis prompts.

## Table of Contents

- [Good Prompts](#good-prompts)
- [Prompts That Can Be Improved](#prompts-that-can-be-improved)
- [Best Practices](#best-practices)

---

## Good Prompts

### Specific with Context

```
Analyze the checkout page at https://store.com/checkout 
and prioritize issues affecting screen reader users
```

**Why it works:** Provides specific URL, focuses on a particular page type, and identifies a priority user group.

---

### With Clear Constraints

```
Give me only critical issues (severity: critical) from https://example.com
that have low remediation effort (remediationEffort: low)
```

**Why it works:** Uses specific filter criteria that map to the tool's output fields.

---

### Request Interpretation

```
Analyze https://form.com and explain which are the 3 most
urgent problems to solve and why
```

**Why it works:** Asks for analysis AND prioritization with reasoning.

---

### With Business Objectives

```
We're launching the web in 2 days. Analyze https://pre-prod.com 
and tell me which issues I MUST fix before launch
```

**Why it works:** Provides context (deadline) that helps prioritize the response.

---

### Section-Specific Analysis

```
Check only the header contrast of my page at https://example.com
```

**Why it works:** Narrows scope to a specific component, making results more actionable.

---

### Educational Focus

```
Analyze https://demo.com and explain in detail 
the WCAG 1.1.1 issue (Non-text content):
- Which users it affects
- Real example of how it impacts them
- How to fix it step by step
```

**Why it works:** Combines analysis with learning objectives and structured output.

---

## Prompts That Can Be Improved

### Too Vague

❌ **Bad:**
```
Is my site accessible?
```

✅ **Better:**
```
Analyze the accessibility of https://my-site.com and summarize the main issues by severity
```

---

### No Action Context

❌ **Bad:**
```
Analyze https://example.com
```

✅ **Better:**
```
Analyze https://example.com and create a prioritized list of fixes 
I can complete this sprint
```

---

### Mixing Analysis Types

❌ **Bad:**
```
Analyze https://example.com and also src/components/*.vue
```

✅ **Better:**
Do two separate analyses:
```
1. Analyze the accessibility of https://example.com
2. Review src/components/*.vue for accessibility patterns
```

---

### Missing URL

❌ **Bad:**
```
Check the contrast of my page
```

✅ **Better:**
```
Check the contrast of https://my-site.com/landing-page
```

---

### Overly Broad

❌ **Bad:**
```
Find all accessibility problems everywhere
```

✅ **Better:**
```
Analyze https://my-site.com with all available tools and group issues by WCAG principle
```

---

## Best Practices

### 1. Be Specific About What You Want

| Instead of... | Use... |
|--------------|--------|
| "Check my site" | "Analyze https://example.com" |
| "Find problems" | "List critical and serious issues" |
| "Is it accessible?" | "Does it meet WCAG AA requirements?" |

### 2. Provide Context

Include relevant information:
- **URL or HTML content** - What to analyze
- **Target audience** - Which users to prioritize
- **Timeline** - When fixes are needed
- **Scope** - Specific sections or components

### 3. Request Structured Output

Ask for organization that helps you take action:
```
Group issues by:
1. Critical + low effort (fix today)
2. High + low effort (fix this week)
3. Everything else by WCAG principle
```

### 4. Use MCP Prompts for Common Tasks

For standard workflows, use the built-in MCP prompts:

| Task | MCP Prompt |
|------|------------|
| Full audit before release | `full-accessibility-audit` |
| Quick check during development | `quick-accessibility-check` |
| Deployment decision | `pre-deploy-check` |
| Color contrast review | `contrast-check` |
| Sprint planning | `quick-wins-report` |
| Learning about WCAG | `explain-wcag-criterion` |

### 5. Iterate Based on Results

Start broad, then narrow down:
```
1. "Analyze https://my-site.com with all tools"
2. "Focus on the 5 critical issues and suggest fixes"
3. "Explain the color-contrast issue in detail with code examples"
```

---

## Related

- [Workflows](./workflows.md) - Recommended workflows for common tasks
- [Interpreting Results](./interpreting-results.md) - How to prioritize findings
- [Prompts Reference](../prompts/README.md) - Available MCP prompts
