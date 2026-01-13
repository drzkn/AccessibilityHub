import { vi } from 'vitest';

vi.mock('../src/utils/logger.js', () => {
  const createMockLogger = () => ({
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  });

  return {
    logger: createMockLogger(),
    createToolLogger: () => createMockLogger(),
    createAdapterLogger: () => createMockLogger(),
    createRequestLogger: () => createMockLogger(),
    generateRequestId: () => `test_${Date.now()}`,
  };
});
