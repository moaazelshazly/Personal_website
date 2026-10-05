import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Use '/Personal_website/' in production for GitHub Pages, and '/' in local development
  base: process.env.NODE_ENV === 'production' ? '/Personal_website/' : '/',
  plugins: [react()],
})
