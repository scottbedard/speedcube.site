import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import initialize from './app/store/initialize';
import modules from './app/store/index';
import rootComponent from './root.vue';
import routes from './app/routes';
import guards from './app/guards';

//
// boot up our application
//
import boot from './app/boot';

boot(Vue);

//
// disable the production tip, we know what we're doing
//
Vue.config.productionTip = false;

//
// create a store
//
const store = new Vuex.Store({
    modules,
    strict: process.env.NODE_ENV !== 'production',
});

//
// create a router
//
const router = new VueRouter({
    mode: 'history',
    routes: routes(store),
});

const { beforeEach, afterEach } = guards(store);

router.beforeEach(beforeEach);
router.afterEach(afterEach);

//
// initialize our store with state from the dom
//
const vuetober = document.head.querySelector('meta[name=vuetober]');

if (vuetober) {
    const data = JSON.parse(vuetober.content);

    initialize(store, data);
}

//
// mount our application to the dom
//
new Vue({
    router,
    store,
    render: h => h(rootComponent),
}).$mount('#app');
