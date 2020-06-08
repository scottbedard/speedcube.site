/* eslint-disable no-param-reassign */
import { VueConstructor } from 'vue';
import CompositionApi from '@vue/composition-api';

/**
 * Setup the Vue constructor.
 */
export function boot(Vue: VueConstructor) {
  Vue.config.productionTip = false;

  Vue.use(CompositionApi);
}
