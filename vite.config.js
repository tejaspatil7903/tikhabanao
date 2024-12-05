import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "public", // Set the build output directory to 'public'
  },
  css: {
    postcss: "./postcss.config.js", // Ensure Vite uses the correct PostCSS configuration
  },
});
