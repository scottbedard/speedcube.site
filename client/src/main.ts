import 'vite/dynamic-import-polyfill'
import './index.scss'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './app/routes'
import App from './App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App)
  .use(router)
  .mount('#app')
