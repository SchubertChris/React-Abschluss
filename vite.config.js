import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Automatische Base-URL je nach Umgebung setzen
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: '/' // 👈 Nur für Produktion setzen
}));
