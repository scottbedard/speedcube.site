<template>
  <v-sphere-geometry
    wireframe
    :color="0xff0000"
    :radius="1" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Dodecaminx } from '@bedard/twister';
import { stubObject } from 'lodash-es';
import VSphereGeometry from '@/components/three/geometries/sphere-geometry.vue';

type DodecaminxConfig = {
  // ...
}

export default defineComponent({
  setup(props) {
    console.log('Hello from the dodecaminx!');
  },
  components: {
    VSphereGeometry,
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