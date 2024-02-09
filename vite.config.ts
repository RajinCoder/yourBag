import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// Import Tailwind CSS and Autoprefixer as ES modules
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [
    react(),
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss, // Use the imported plugin
        autoprefixer, // Use the imported plugin
      ],
    },
  },
});
