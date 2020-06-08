import Vue from 'vue';
import App from './App.vue';
import { boot } from '../app/boot';

boot(Vue);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
