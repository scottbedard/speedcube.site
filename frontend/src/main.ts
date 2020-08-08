import * as Vue from 'vue';
import './registerServiceWorker';
import { router } from './router';
import App from './App.vue';

const app = Vue.createApp(App);

app.use(router);

app.mount('#app');

/* eslint-disable-next-line @typescript-eslint/ban-ts-ignore */
// @ts-ignore
window.app = app;
