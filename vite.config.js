import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "https://github.com/raylinpeguero78/MEMORY-GAME.git" // Reemplaza "MEMORY-GAME" con el nombre exacto de tu repositorio
});
