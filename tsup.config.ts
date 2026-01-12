import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts'],
  format: ['esm'],
  target: 'node20',
  outDir: 'dist',
  clean: true,
  sourcemap: true,
  dts: true,
  splitting: false,
  treeshake: true,
  minify: false,
  esbuildOptions(options) {
    options.alias = {
      '@/types': './src/types',
      '@/tools': './src/tools',
      '@/adapters': './src/adapters',
      '@/normalizers': './src/normalizers',
      '@/utils': './src/utils',
    };
  },
});
