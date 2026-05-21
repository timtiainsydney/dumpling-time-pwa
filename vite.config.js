import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',

      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'pwa-192x192.png', 'pwa-512x512.png', 'maskable-icon-512x512.png'],
      manifest: {
        id: '/',
        name: 'Dumpling Time',
        short_name: 'Dumpling',
        description: 'Dumpling Time restaurant menu and booking app.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#e94560',
        background_color: '#f8f5f0',
        categories: ['food', 'lifestyle'],
        shortcuts: [
          {
            name: 'Open Menu',
            short_name: 'Menu',
            description: 'Browse Dumpling Time menu',
            url: '/?screen=menu',
            icons: [{ src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' }]
          },
          {
            name: 'Book a Table',
            short_name: 'Book',
            description: 'Request a Dumpling Time booking',
            url: '/?screen=booking',
            icons: [{ src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' }]
          }
        ],
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,svg,webmanifest}'],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [
          /^\\/order\\.html/,
          /^\\/qr-codes\\//,
          /^\\/shop1\\.jpg$/,
          /^\\/shop2\\.jpg$/,
          /\\.(?:png|jpg|jpeg|webp|gif|svg)$/i
        ],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true
      },
      devOptions: {
        enabled: true
      }
    })
  ]
});
