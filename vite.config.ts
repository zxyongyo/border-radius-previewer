import { defineConfig } from "vite"
import { resolve } from 'path'

export default defineConfig({
  root: '.',
  base: '/border-radius-previewer/',
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        fullcontrol: resolve(__dirname, 'full-control.html')
      }
    }
  }
})