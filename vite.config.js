import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';

export const aliases = {
  '@': path.resolve(__dirname, './src'),
  '@components': `${path.resolve(__dirname, './src/app/components')}`,
  '@public': `${path.resolve(__dirname, './public/')}`,
  '@store': `${path.resolve(__dirname, './src/app/store')}`,
};

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: aliases,
  },
});
