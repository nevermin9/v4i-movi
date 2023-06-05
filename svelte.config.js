import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
// import preprocess from 'svelte-preprocess'
import sharedConfig from './shared.config.js';



/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess()],
	// preprocess: preprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			...sharedConfig.alias,
		},
	},
};

export default config;
