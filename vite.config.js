import { defineConfig } from 'vite';
import path from 'path';
import glob from 'glob';
import pluginVue from '@vitejs/plugin-vue';

const srcRoot = path.resolve(__dirname, 'src');
const outputRoot = path.resolve(__dirname, 'dist');
const componentEntries = glob.sync(path.resolve(srcRoot, 'components/*/index.html')).reduce((curr, filePath) => {
	curr[path.dirname(`${ filePath }`).split('/').at(-1)] = filePath;
	return curr;
}, {});

export default defineConfig({
	root: srcRoot,
	plugins: [
		pluginVue(),
	],
	build: {
		outDir: outputRoot,
		emptyOutDir: true,
		rollupOptions: {
			input: {
				main: path.resolve(srcRoot, 'index.html'),
				...componentEntries,
			},
		}
	}
});
