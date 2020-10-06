const examples: Record<string, () => Promise<typeof import('*.vue')>> = {
  '<v-button>': () => import('./button-example.vue'),
};

export default examples;