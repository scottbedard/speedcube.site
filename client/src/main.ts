import { boot } from '@/app/boot';
import { Context } from '@/types/context';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/app/routes';

import App from './app.vue';

// setup initial state
const root = document.getElementById('app') as HTMLElement;
const context = JSON.parse(root.dataset.context as string) as Context;

boot(context);

// create a router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// create and mount applicaton
createApp(App)
  .use(router)
  .mount(root);
