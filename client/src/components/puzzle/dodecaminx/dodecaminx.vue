<template>
  <v-core />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Dodecaminx } from '@bedard/twister';
import { stubObject } from 'lodash-es';
import VCore from './core.vue';

type DodecaminxConfig = {
  // ...
}

export default defineComponent({
  setup() {
    // ...
  },
  components: {
    VCore,
  },
  props: {
    config: {
      default: stubObject,
      type: Object as PropType<Partial<DodecaminxConfig>>,
    },
    currentTurn: {
      default: '',
      type: String,
    },
    model: {
      default: () => new Dodecaminx({ size: 3 }),
      type: Object as PropType<Dodecaminx>,
    },
    turnProgress: {
      default: 0,
      type: Number,
    },
  },
});
</script>