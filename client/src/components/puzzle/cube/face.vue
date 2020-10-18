<template>
  <v-axes-helper />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { MeshLambertMaterial, ShapeBufferGeometry } from 'three';
import VAxesHelper from '@/components/three/utils/axes-helper.vue';

export default defineComponent({
  setup() {
    // ...
  },
  components: {
    VAxesHelper,
  },
  props: {
    geometry: Object as PropType<ShapeBufferGeometry>,
    materials: Array as unknown as PropType<MeshLambertMaterial[]>,
  },
});
</script>
