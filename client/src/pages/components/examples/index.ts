// @todo
// figure out why this file throws a type error when examples
// is Record<string, () => Promise<typeof import('*.vue')>>

const examples: Record<string, () => Promise<any>> = {
  '<v-button>': () => import('./button-example.vue' /* webpackChunkName: 'button-example' */),
  '<v-card>': () => import('./card-example.vue' /* webpackChunkName: 'card-example' */),
  '<v-input>': () => import('./input-example.vue' /* webpackChunkName: 'input-example' */),
  '<v-puzzle>': () => import('./puzzle-example.vue' /* webpackChunkName: 'puzzle-example' */),
  '<v-range-input>': () => import('./range-input-example.vue' /* webpackChunkName: 'component-example' */),
  '<v-scene>': () => import('./scene-example.vue' /* webpackChunkName: 'scene-example' */),
};

export default examples;