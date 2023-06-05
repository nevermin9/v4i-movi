import {sveltekit} from '@sveltejs/kit/vite';
import {defineConfig} from 'vite';
// import sharedConfig from './shared.config.js';

const PORT = 3000

export default defineConfig ({
  plugins: [sveltekit ()],
  server: {
    port: PORT,
  },
  preview: {
    port: PORT,
    host: '0.0.0.0'
  },
  // resolve: {
  //   alias: {
  //     ...sharedConfig.alias,
  //   }
  // }
});
