import Vue from 'vue';
import { boot } from '@/app/boot';
import { createRouter } from '@/app/router';
import { createStore } from '@/app/store';
import { isProduction } from '@/app/constants';
import App from './App.vue';

// configure vue
boot(Vue);

// create a store
const store = createStore();

// create a router
const router = createRouter(store);

// create our application and mount it to the dom
const app = new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');

// expose application globally for easier debugging
// @ts-ignore
if (!isProduction) window.app = app;
