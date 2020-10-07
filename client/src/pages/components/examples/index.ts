// @todo
// figure out why this file throws a type error when examples
// is Record<string, () => Promise<typeof import('*.vue')>>

const examples: Record<string, () => Promise<any>> = {
  '<v-button>': () => import('./button-example.vue' /* webpackChunkName: 'button-example' */),
  '<v-card>': () => import('./card-example.vue' /* webpackChunkName: 'card-example' */),
  '<v-input>': () => import('./input-example.vue' /* webpackChunkName: 'input-example' */),
  '<v-range-input>': () => import('./range-input-example.vue' /* webpackChunkName: 'component-example' */),
};

export default examples;