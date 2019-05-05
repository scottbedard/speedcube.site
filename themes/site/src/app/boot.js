import globalComponents from '@/components/global';

//
// directives
//
import autofocusDirective from './directives/autofocus';

//
// filters
//
import momentFilter from './filters/moment';
import numericFilter from './filters/numeric';
import pluralizeFilter from './filters/pluralize';
import timerFilter from './filters/timer';

//
// plugins
//
import alertPlugin from './plugins/alert';
import portalPlugin from './plugins/portal';
import routerPlugin from './plugins/router';
import vuexPlugin from './plugins/vuex';


export default function (Vue) {
    Vue.config.productionTip = false;
    Vue.config.devtools = false;

    // directives
    autofocusDirective(Vue);

    // filters
    momentFilter(Vue);
    numericFilter(Vue);
    pluralizeFilter(Vue);
    timerFilter(Vue);

    // plugins
    alertPlugin(Vue);
    portalPlugin(Vue);
    routerPlugin(Vue);
    vuexPlugin(Vue);

    // global components
    Object.keys(globalComponents).forEach((name) => {
        Vue.component(name, globalComponents[name]);
    });
}