import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@vue3-components/components': resolve(__dirname, '../packages/components/src/index.ts'),
      '@vue3-components/utils': resolve(__dirname, '../packages/utils/src/index.ts')
    }
  },
  server: {
    port: 3000,
    open: true
  }
})

