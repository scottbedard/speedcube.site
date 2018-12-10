import Vue from 'vue';
import globalComponents from '@/components/global';

//
// directives
//
import './directives/autofocus';

//
// filters
//
import './filters/moment';
import './filters/timer';

//
// plugins
//
import './plugins/alert';
import './plugins/router';
import './plugins/vuex';

//
// register global components
//
Object.keys(globalComponents).forEach((name) => {
    Vue.component(name, globalComponents[name]);
});
