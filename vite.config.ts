import type { UserConfig } from 'vite';

export default {
	build: {
		lib: {
			entry: 'temp/index.js',
			name: 'MaterialDynamicColor',
			filename: 'material-dyanamic-color',
			formats: ['es', 'cjs', 'iife', 'umd']
		}
	}
} as UserConfig;
