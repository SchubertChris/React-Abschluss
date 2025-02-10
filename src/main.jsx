import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx' // Einsteigspunkt
import "./main.scss"; // ✅ SCSS wird von Vite verarbeitet

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
