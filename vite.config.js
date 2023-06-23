import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "./",
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      manifest: {
        "name": "EcoBees Work Log Management System",
        "short_name": "EcoBees",
        "description": "EcoBees Work Log Management System",
        "icons": [
          {
            "src": "/manifest-icon-192_maskable.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "/manifest-icon-512_maskable.png",
            "sizes": "512x512",
            "type": "image/png"
          },
          {
            "src": "/apple.png",
            "sizes": "180x180",
            "type": "image/png",
            "purpose": "apple touch icon"
          },
          {
            "src": "/maskable_iconx225.png",
            "sizes": "225x225",
            "type": "image/png",
            "purpose": "any maskable"
          }
        ],
        "theme_color": "#fdb517",
        "background_color": "#ffffff",
        "display": "standalone",
        "scope": "https://ecobees.vercel.app/",
        "start_url": "https://ecobees.vercel.app/signin",
        "orientation": "portrait-primary"
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