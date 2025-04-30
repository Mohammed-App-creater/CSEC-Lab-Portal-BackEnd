import { defineConfig } from 'tsup'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  entry: ['src/app/server.ts'],
  outDir: 'dist',
  target: 'node18',
  format: ['cjs'],
  sourcemap: true,
  clean: true,
  dts: false,
  minify: false,
  external: ['tsconfig-paths'],
  esbuildPlugins: [
    {
      name: 'copy-index-html',
      setup(build) {
        build.onEnd(() => {
          const srcPath = path.resolve('index.html')
          const destPath = path.resolve('dist/index.html')

          if (fs.existsSync(srcPath)) {
            fs.copyFileSync(srcPath, destPath)
            console.log('✅ index.html copied to dist/')
          } else {
            console.warn('⚠️ index.html not found in src/')
          }
        })
      }
    }
  ]
})
