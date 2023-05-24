import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	base: '/work-tracker/',
	build: {
		outDir: 'docs',
	},
	resolve: {
		alias: [
			{
				find: '@',
				replacement: '/src',
			},
			{
				find: '@/core',
				replacement: '/src/core',
			},
			{
				find: '@/libs',
				replacement: '/src/libs',
			},
			{
				find: '@/routes',
				replacement: '/src/routes',
			},
		],
	},
});
