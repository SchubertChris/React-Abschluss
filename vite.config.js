import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base-URL für GitHub Pages oder leere Base für Vercel/Netlify
export default defineConfig({
  plugins: [react()],
  base: "/React-Abschluss/", 
});
