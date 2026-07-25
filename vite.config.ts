import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { spawn } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'start-backend',
      configureServer(server) {
        const backendPath = path.resolve(__dirname, 'server/index.js')
        const backend = spawn('node', [backendPath], {
          stdio: 'inherit',
          shell: false,
        })

        backend.on('error', (err) => {
          console.error('Failed to start backend server:', err)
        })

        server.httpServer?.on('close', () => {
          backend.kill()
        })
      },
    },
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
