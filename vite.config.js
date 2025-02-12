import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base-URL für GitHub Pages setzen
export default defineConfig({
  plugins: [react()],
  base: "/React-Abschluss/", // Stelle sicher, dass dies mit deinem Repository-Namen übereinstimmt!
});
