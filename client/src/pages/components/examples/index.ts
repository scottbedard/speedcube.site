const examples: Record<string, () => Promise<typeof import('*.vue')>> = {
  '<v-button>': () => import('./button-example.vue'),
  '<v-input>': () => import('./input-example.vue'),
};

export default examples;