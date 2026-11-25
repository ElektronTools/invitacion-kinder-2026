import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' -> el sitio funciona en cualquier hosting y en cualquier subcarpeta
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: 'es2020',
    sourcemap: false,
    cssCodeSplit: false,
    cssMinify: true,
    assetsInlineLimit: 4096,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 300,
  },
})
