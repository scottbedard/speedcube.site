import { createApp } from 'vue';
import App from './App.vue';

const root = document.getElementById('app') as HTMLElement;
// const context = JSON.parse(root.dataset.context);

createApp(App).mount(root);
