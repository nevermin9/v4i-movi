import {sveltekit} from '@sveltejs/kit/vite';
import {defineConfig} from 'vite';
// import sharedConfig from './shared.config.js';

export default defineConfig ({
  plugins: [sveltekit ()],
  server: {
    port: '3000',
  },
  // resolve: {
  //   alias: {
  //     ...sharedConfig.alias,
  //   }
  // }
});
