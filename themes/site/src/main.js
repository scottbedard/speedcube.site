import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import modules from './app/store';
import rootComponent from './root.vue';
import routes from './app/routes';
import { beforeEach, afterEach } from './app/guards';

//
// boot up our application
//
import './app/boot';

//
// disable the production tip, we know what we're doing
//
Vue.config.productionTip = false;

//
// create a router
//
const router = new VueRouter({
    mode: 'history',
    routes,
});

router.beforeEach(beforeEach);
router.afterEach(afterEach);

//
// create a store
//
const store = new Vuex.Store({
    modules,
    strict: process.env.NODE_ENV !== 'production',
});

//
// mount our application to the dom
//
new Vue({
    router,
    store,
    render: h => h(rootComponent),
}).$mount('#app');
