export interface MockToolRegistration {
  name: string;
  description: string;
  schema: Record<string, unknown>;
  handler: (
    input: Record<string, unknown>
  ) => Promise<{ content: Array<{ type: string; text: string }> }>;
}

export interface MockMcpServer {
  registeredTools: Map<string, MockToolRegistration>;
  tool: (
    name: string,
    description: string,
    schema: Record<string, unknown>,
    handler: MockToolRegistration['handler']
  ) => void;
}

export function createMockServer(): MockMcpServer {
  const registeredTools = new Map<string, MockToolRegistration>();

  return {
    registeredTools,
    tool(name, description, schema, handler) {
      registeredTools.set(name, { name, description, schema, handler });
    },
  };
}

export function getToolHandler(
  server: MockMcpServer,
  toolName: string
): MockToolRegistration['handler'] {
  const registration = server.registeredTools.get(toolName);
  if (!registration) {
    throw new Error(`Tool "${toolName}" not registered`);
  }
  return registration.handler;
}
