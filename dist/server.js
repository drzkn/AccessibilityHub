import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

// src/server.ts
var server = new McpServer({
  name: "mcp-a11y-server",
  version: "0.1.0"
});
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
main().catch((error) => {
  console.error("Failed to start MCP server:", error);
  process.exit(1);
});
//# sourceMappingURL=server.js.map
//# sourceMappingURL=server.js.map