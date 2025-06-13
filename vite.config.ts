import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: '::',
    port: 8080,
    proxy: {
      '/auth': {
        target: 'https://iniskjttmistgljqhqke.supabase.co',
        changeOrigin: true,
        secure: false,
      },
      '/rest': {
        target: 'https://iniskjttmistgljqhqke.supabase.co',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}));