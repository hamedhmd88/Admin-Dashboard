import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  //برای مسیر دهی بهتر و راحتر از این قطعه کد استفاده میکنیم 
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets')
    }
  },
  plugins: [react()],
})
