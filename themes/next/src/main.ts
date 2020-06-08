import Vue from 'vue';
import { boot } from '@/app/boot';
import App from './App.vue';

boot(Vue);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
