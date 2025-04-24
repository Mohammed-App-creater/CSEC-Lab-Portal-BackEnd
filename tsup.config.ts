import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/app/server.ts'],
    outDir: 'dist',
    target: 'node18',
    format: ['cjs'],
    sourcemap: true,
    clean: true,
    dts: false,
    minify: false,
    external: ['tsconfig-paths'], // 👈 don't bundle this library
});

