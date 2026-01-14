import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { ESLintAdapter } from '@/adapters/eslint.js';
import { ESLintA11yToolInputSchema, type ESLintA11yToolInput } from '@/types/tool-inputs.js';
import type { AnalysisTarget, AnalysisOptions } from '@/types/analysis.js';
import type { AnalysisResult } from '@/types/accessibility.js';
import {
  type ToolDefinition,
  type ToolResponse,
  createJsonResponse,
  createErrorResponse,
  withToolContext,
} from './base.js';

let sharedAdapter: ESLintAdapter | null = null;

function getAdapter(): ESLintAdapter {
  if (!sharedAdapter) {
    sharedAdapter = new ESLintAdapter({
      timeout: 30000,
    });
  }
  return sharedAdapter;
}

async function disposeAdapter(): Promise<void> {
  if (sharedAdapter) {
    await sharedAdapter.dispose();
    sharedAdapter = null;
  }
}

process.on('SIGINT', () => {
  disposeAdapter().finally(() => process.exit(0));
});

process.on('SIGTERM', () => {
  disposeAdapter().finally(() => process.exit(0));
});

function buildAnalysisTarget(input: ESLintA11yToolInput): AnalysisTarget {
  if (input.files && input.files.length > 0) {
    return {
      type: 'file',
      value: input.files[0]!,
    };
  }

  if (input.directory) {
    return {
      type: 'file',
      value: input.directory,
    };
  }

  return {
    type: 'html',
    value: input.code!,
  };
}

function buildAnalysisOptions(_input: ESLintA11yToolInput): AnalysisOptions {
  return {
    wcagLevel: 'AA',
    includeWarnings: true,
  };
}

interface ESLintToolOutput {
  success: boolean;
  target: string;
  issueCount: number;
  issues: AnalysisResult['issues'];
  summary: AnalysisResult['summary'];
  metadata?: AnalysisResult['metadata'] | undefined;
  duration?: number | undefined;
  error?: string | undefined;
}

function formatOutput(result: AnalysisResult): ESLintToolOutput {
  return {
    success: result.success,
    target: result.target,
    issueCount: result.issues.length,
    issues: result.issues,
    summary: result.summary,
    metadata: result.metadata,
    duration: result.duration,
    error: result.error,
  };
}

const handleESLintAnalysis = withToolContext<ESLintA11yToolInput>(
  'analyze-with-eslint',
  async (input, context): Promise<ToolResponse> => {
    context.logger.debug('Building analysis configuration', {
      hasFiles: !!(input.files && input.files.length > 0),
      hasDirectory: !!input.directory,
      hasCode: !!input.code,
    });

    const adapter = getAdapter();

    const isAvailable = await adapter.isAvailable();
    if (!isAvailable) {
      return createErrorResponse(
        new Error('ESLint adapter is not available.')
      );
    }

    const target = buildAnalysisTarget(input);
    const options = buildAnalysisOptions(input);

    context.logger.info('Starting ESLint analysis', {
      targetType: target.type,
      target: target.type === 'file' ? target.value : '[inline code]',
    });

    const result = await adapter.analyze(target, options);

    if (!result.success) {
      context.logger.warn('Analysis completed with errors', {
        error: result.error,
      });
    }

    const output = formatOutput(result);
    return createJsonResponse(output, !result.success);
  }
);

const ESLintToolMcpInputSchema = z.object({
  files: z
    .array(z.string())
    .min(1)
    .optional()
    .describe('Array of file paths to lint'),
  directory: z.string().optional().describe('Directory path to lint recursively'),
  code: z.string().optional().describe('Inline Vue component code to lint'),
  options: z
    .object({
      rules: z
        .record(
          z.string(),
          z.union([z.enum(['off', 'warn', 'error']), z.number().int().min(0).max(2)])
        )
        .optional()
        .describe('Override specific rule configurations'),
      fix: z
        .literal(false)
        .default(false)
        .describe('Fix mode is disabled - MCP only reports issues'),
    })
    .optional(),
});

export const analyzeWithESLintTool: ToolDefinition = {
  name: 'analyze-with-eslint',
  description: `Analyze Vue.js files for accessibility issues using ESLint with eslint-plugin-vuejs-accessibility.

Performs static code analysis of Vue components.

Input options:
- files: Array of file paths to lint (must be .vue files)
- directory: Directory path to lint recursively
- code: Inline Vue component code to lint
- options.rules: Override specific rule configurations (off, warn, error, or 0-2)
- options.fix: Fix mode (always disabled - MCP only reports issues)

Output:
- issues: Array of accessibility issues found
- summary: Issue counts by severity and WCAG principle
- metadata: Tool version info`,

  register(server: McpServer): void {
    server.tool(
      this.name,
      this.description,
      ESLintToolMcpInputSchema.shape,
      async (input): Promise<{ content: Array<{ type: 'text'; text: string }> }> => {
        const parseResult = ESLintA11yToolInputSchema.safeParse(input);

        if (!parseResult.success) {
          const errors = parseResult.error.errors
            .map((e) => `${e.path.join('.')}: ${e.message}`)
            .join('; ');
          const response = createErrorResponse(new Error(`Invalid input: ${errors}`));
          return { content: response.content };
        }

        const response = await handleESLintAnalysis(parseResult.data);
        return { content: response.content };
      }
    );
  },
};

export { disposeAdapter as disposeESLintAdapter };
