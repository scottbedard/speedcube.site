// @todo
// figure out why this file throws a type error when examples
// is Record<string, () => Promise<typeof import('*.vue')>>

const examples: Record<string, () => Promise<any>> = {
  '<v-button>': () => import('./button-example.vue' /* webpackChunkName: 'button-example' */),
  '<v-card>': () => import('./card-example.vue' /* webpackChunkName: 'card-example' */),
  '<v-checkbox>': () => import('./checkbox-example.vue' /* webpackChunkName: 'checkbox-example' */),
  '<v-color-picker>': () => import('./color-picker-example.vue' /* webpackChunkName: 'color-picker-example' */),
  '<v-cube>': () => import('./puzzle-cube-example.vue' /* webpackChunkName: 'puzzle-cube-example' */),
  '<v-dodecaminx>': () => import('./puzzle-dodecaminx-example.vue' /* webpackChunkName: 'puzzle-dodecaminx-example' */),
  '<v-input>': () => import('./input-example.vue' /* webpackChunkName: 'input-example' */),
  '<v-modal>': () => import('./modal-example.vue' /* webpackChunkName: 'modal-example' */),
  '<v-range-input>': () => import('./range-input-example.vue' /* webpackChunkName: 'component-example' */),
  '<v-scene>': () => import('./scene-example.vue' /* webpackChunkName: 'scene-example' */),
  '<v-spinner>': () => import('./spinner-example.vue' /* webpackChunkName: 'spinner-example' */),
  'fireAlert': () => import('./alert-example.vue' /* webpackChunkName: 'alert-example' */),
};

export default examples;