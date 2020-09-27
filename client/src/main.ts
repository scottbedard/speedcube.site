import { createApp } from 'vue';
import { router } from '@/app/router';
import App from './App.vue';

const root = document.getElementById('app') as HTMLElement;

// @todo: set default context
// const context = JSON.parse(root.dataset.context);

createApp(App)
  .use(router)
  .mount(root);
