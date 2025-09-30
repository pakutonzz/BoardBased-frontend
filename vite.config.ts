import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 8082,        // pick any free port
    host: '127.0.0.1', // force IPv4 (avoids ::1 issues)
    strictPort: true   // fail if taken instead of auto-increment
  }
})
