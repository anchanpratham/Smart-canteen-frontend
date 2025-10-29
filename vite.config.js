import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // ⬇️ ADD THIS 'server' BLOCK ⬇️
  server: {
    // This tells Vite to forward any request starting with '/api' 
    // from port 5173 to your Node.js server on port 5000.
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // <--- Your backend port
        changeOrigin: true,
        secure: false, 
      },
    },
  },
  // ⬆️ END OF ADDED BLOCK ⬆️
})