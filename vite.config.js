import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      workbox: {
        globPatterns: ["**/*"]
      },
      includeAssets: [
        "**/*"
      ],
      manifest: {
        "theme_color": "#fdb517",
        "background_color": "#ffffff",
        "display": "standalone",
        "scope": "/",
        "start_url": "/",
        "short_name": "EcoBees",
        "description": "EcoBees Work Log Management System",
        "name": "EcoBees Work Log Management System",
        "orientation": "portrait-primary",
        "icons": [
          {
            "src": "/manifest-icon-192.maskable.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/manifest-icon-192.maskable.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "/manifest-icon-512.maskable.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/manifest-icon-512.maskable.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      src: "/src",
      components: "/src/components",
      contexts: "/src/contexts"
    }
  }
});