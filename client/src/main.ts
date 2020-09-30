import { boot } from '@/app/boot';
import { Context } from '@/types/context';
import { createApp } from 'vue';
import { router } from '@/app/router';
import App from './app.vue';

const root = document.getElementById('app') as HTMLElement;

const context = JSON.parse(root.dataset.context as string) as Context;

boot(context);

createApp(App)
  .use(router)
  .mount(root);
