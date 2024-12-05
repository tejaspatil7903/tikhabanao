import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Set the build output directory to 'dist' (not public)
    emptyOutDir: true, // Clear the dist folder before building
  },
  css: {
    postcss: "./postcss.config.js", // Ensure Vite uses the correct PostCSS configuration
  },
  publicDir: "public", // Keep 'public' directory for static assets
});
