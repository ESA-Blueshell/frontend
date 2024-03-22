// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, {transformAssetUrls} from 'vite-plugin-vuetify'
import {VitePWA} from 'vite-plugin-pwa'

// Utilities
import {defineConfig} from 'vite'
import {fileURLToPath, URL} from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {transformAssetUrls}
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
        type: 'module',
      },
      manifest: {
        name: "Blusehell Esports",
        short_name: "Blueshell",
        description: "Beschrijving van de website. Dit is een beschrijving van de website.",
        icons: [
          {
            src: '/shiticon.png',
            sizes: '576x576',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
        theme_color: '#3387FA',
        background_color: '#1E1E1E',
        display: 'standalone',
      },
      workbox: {
        runtimeCaching: [{
          urlPattern: ({url}) => url.pathname.startsWith('/api'),
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        }],
      },
    }),
  ],
  define: {'process.env': {}},
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3000,
  },
})
