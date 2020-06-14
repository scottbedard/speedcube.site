/* eslint-disable no-param-reassign */
import { VueConstructor } from 'vue';
import CompositionApi from '@vue/composition-api';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

/**
 * Initialize our Vue application.
 */
export function boot(Vue: VueConstructor) {
  Vue.config.productionTip = false;

  Vue.use(CompositionApi);
  Vue.use(VueRouter);
  Vue.use(Vuex);
}
