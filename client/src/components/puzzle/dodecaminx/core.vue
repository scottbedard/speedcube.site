<template>
  <v-dodecahedron-geometry />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VDodecahedronGeometry from '@/components/three/geometries/dodecahedron-geometry.vue';

export default defineComponent({
  setup() {
    // ...
  },
  components: {
    VDodecahedronGeometry,
  },
});
</script>
