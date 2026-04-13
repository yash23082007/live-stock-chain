import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.farmfinance\.co\/api\/v1\/products/,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'products-cache', expiration: { maxAgeSeconds: 86400 } }
          }
        ]
      },
      manifest: {
        name: 'Farm Input Finance',
        short_name: 'FarmFin',
        theme_color: '#16a34a',
        icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }]
      }
    })
  ]
})
