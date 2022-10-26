
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
//import { createVuePlugin as vue } from "vite-plugin-vue2";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build:{
outDir:"C:\\Users\\user\\Documents\\gordon_work\\syncline\\server\\static\\login"
  }
 
})
/*
module.exports = {
    devServer: {
      port: 8081
    }
  }
  */