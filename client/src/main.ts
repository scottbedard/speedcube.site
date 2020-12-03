import { boot } from '@/app/boot';
import { Context } from '@/types/context';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/app/routes';

import App from './app.vue';

// configure namespace
interface Speedcube extends Window {
  context: Context;
}

declare var window: Speedcube;

// setup initial state
const root = document.getElementById('app') as HTMLElement;

window.context = JSON.parse(root.dataset.context as string) as Context;

boot(window.context);

// create a router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// create and mount applicaton
createApp(App)
  .use(router)
  .mount(root);
