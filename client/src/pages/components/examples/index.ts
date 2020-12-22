// @todo
// figure out why this file throws a type error when examples
// is Record<string, () => Promise<typeof import('*.vue')>>

const examples: Record<string, () => Promise<any>> = {
  '<v-button>': () => import('./button-example.vue' /* webpackChunkName: 'button-example', webpackPrefetch: false */),
  '<v-card>': () => import('./card-example.vue' /* webpackChunkName: 'card-example', webpackPrefetch: false */),
  '<v-checkbox>': () => import('./checkbox-example.vue' /* webpackChunkName: 'checkbox-example', webpackPrefetch: false */),
  '<v-color-picker>': () => import('./color-picker-example.vue' /* webpackChunkName: 'color-picker-example', webpackPrefetch: false */),
  '<v-cube>': () => import('./puzzle-cube-example.vue' /* webpackChunkName: 'puzzle-cube-example', webpackPrefetch: false */),
  '<v-dodecaminx>': () => import('./puzzle-dodecaminx-example.vue' /* webpackChunkName: 'puzzle-dodecaminx-example', webpackPrefetch: false */),
  '<v-input>': () => import('./input-example.vue' /* webpackChunkName: 'input-example', webpackPrefetch: false */),
  '<v-modal>': () => import('./modal-example.vue' /* webpackChunkName: 'modal-example', webpackPrefetch: false */),
  '<v-range-input>': () => import('./range-input-example.vue' /* webpackChunkName: 'component-example', webpackPrefetch: false */),
  '<v-scene>': () => import('./scene-example.vue' /* webpackChunkName: 'scene-example', webpackPrefetch: false */),
  '<v-spinner>': () => import('./spinner-example.vue' /* webpackChunkName: 'spinner-example', webpackPrefetch: false */),
  'fireAlert': () => import('./alert-example.vue' /* webpackChunkName: 'alert-example', webpackPrefetch: false */),
};

export default examples;