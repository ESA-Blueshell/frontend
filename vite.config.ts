import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  build: {
    target: "esnext"
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/settings.scss";`
      }
    }
  },
  plugins: [
    vue(),
    vuetify({ autoImport: true })
  ],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    extensions: ['.vue', '.ts', '.js']
  },
  server: {
    port: 3000,
    watch: {
      usePolling: true
    }
  }
})
