import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    // Add resource optimization
    hmr: {
      overlay: false // Disable error overlay to reduce resource usage
    }
  },
  build: {
    // Optimize build for Vercel deployment
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks to reduce initial bundle size
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react'],
          router: ['react-router-dom']
        }
      }
    },
    // Reduce chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Optimize for Vercel
    target: 'esnext',
    cssCodeSplit: true
  },
  // Add resource optimization
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react', 'react-router-dom'],
    exclude: []
  },
  // Add performance hints
  define: {
    __DEV__: process.env.NODE_ENV === 'development'
  },
  // Base path for Vercel deployment
  base: '/'
})
