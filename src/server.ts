import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { logger } from '@/utils/logger.js';
import { analyzeWithAxeTool, disposeAxeAdapter } from '@/tools/axe.js';

const server = new McpServer({
  name: 'ai-ccesibility',
  version: '0.1.0',
});

function registerTools(): void {
  analyzeWithAxeTool.register(server);
  logger.info('Registered tool: analyze-with-axe');
}

async function main(): Promise<void> {
  logger.info('Starting AI-ccesibility Server', {
    version: '0.1.0',
  });

  registerTools();

  const transport = new StdioServerTransport();
  await server.connect(transport);

  logger.info('AI-ccesibility Server connected and ready');
}

async function shutdown(): Promise<void> {
  logger.info('Shutting down AI-ccesibility Server');
  await disposeAxeAdapter();
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

main().catch((error: unknown) => {
  logger.error('Failed to start MCP server', {
    error: error instanceof Error ? error : new Error(String(error)),
  });
  process.exit(1);
});
