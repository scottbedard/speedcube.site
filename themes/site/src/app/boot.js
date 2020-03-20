import globalComponents from '@/components/global';
import { isTesting, isProduction } from './constants';

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
import compositionPlugin from './plugins/composition';
import portalPlugin from './plugins/portal';
import routerPlugin from './plugins/router';
import vuexPlugin from './plugins/vuex';

export default function (Vue) {
    Vue.config.productionTip = isProduction;
    Vue.config.devtools = !isTesting && !isProduction;

    // directives
    autofocusDirective(Vue);

    // filters
    momentFilter(Vue);
    numericFilter(Vue);
    pluralizeFilter(Vue);
    timerFilter(Vue);

    // plugins
    alertPlugin(Vue);
    compositionPlugin(Vue);
    portalPlugin(Vue);
    routerPlugin(Vue);
    vuexPlugin(Vue);

    // global components
    Object.keys(globalComponents).forEach((name) => {
        Vue.component(name, globalComponents[name]);
    });
}
