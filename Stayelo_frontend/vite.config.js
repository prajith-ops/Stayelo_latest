import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ No '@tailwindcss/vite' import needed for Tailwind v3
export default defineConfig({
  plugins: [react()],
})
