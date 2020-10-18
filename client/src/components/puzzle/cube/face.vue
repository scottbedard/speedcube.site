<template>
  <v-axes-helper />

  <v-shape
    :geometry="geometry"
    :material="materials[0]" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { MeshLambertMaterial, ShapeBufferGeometry } from 'three';
import VAxesHelper from '@/components/three/utils/axes-helper.vue';
import VShape from '@/components/three/utils/shape.vue';

export default defineComponent({
  setup() {
    // ...
  },
  components: {
    VAxesHelper,
    VShape,
  },
  props: {
    geometry: Object as PropType<ShapeBufferGeometry>,
    materials: Array as unknown as PropType<MeshLambertMaterial[]>,
  },
});
</script>
