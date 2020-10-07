const examples: Record<string, () => Promise<typeof import('*.vue')>> = {
  '<v-button>': () => import('./button-example.vue' /* webpackChunkName: 'button-example' */),
  '<v-card>': () => import('./card-example.vue' /* webpackChunkName: 'card-example' */),
  '<v-input>': () => import('./input-example.vue' /* webpackChunkName: 'input-example' */),
  '<v-range-input>': () => import('./range-input-example.vue' /* webpackChunkName: 'range-input-example' */),
};

export default examples;