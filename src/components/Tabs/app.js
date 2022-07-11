import { createApp } from 'vue';
import App from './App.vue';
window.addEventListener('load', () => {
	// wait until all CSS are loaded
	createApp(App).mount('#app');
});
