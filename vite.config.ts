import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// Alias base al directorio src (sin depender de path de Node)
const projectRoot = new URL('./', import.meta.url).pathname

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': `${projectRoot}src`
    }
  },
});
