import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base-URL für GitHub Pages oder leere Base für Vercel/Netlify
export default defineConfig({
  plugins: [react()],
  base: "/React-Abschluss/",  // Falls GitHub Pages (ersetze durch dein Repo)
  // base: "/",  // Falls du es NICHT für GitHub Pages brauchst
  server: {
    port: 3000, // Optional: Setzt den lokalen Entwicklungsport
  }
});
