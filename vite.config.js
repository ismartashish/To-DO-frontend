import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/To-DO/', // Must match your repo name exactly (case-sensitive)
});
