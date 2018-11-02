import Vue from 'vue';
import globalComponents from '@/components/global';

//
// plugins
//
import './plugins/router';
import './plugins/vuex';

//
// register global components
//
Object.keys(globalComponents).forEach((name) => {
    Vue.component(name, globalComponents[name]);
});
