<template>
  <v-dodecahedron-geometry :radius="radius" wireframe>
    <!-- <v-face /> -->
    <template #u>
      <v-face :radius="radius" />
    </template>
  </v-dodecahedron-geometry>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VDodecahedronGeometry from '@/components/three/geometries/dodecahedron-geometry.vue';
import VFace from './face.vue';

export default defineComponent({
  setup() {
    // ...
  },
  components: {
    VDodecahedronGeometry,
    VFace,
  },
  props: {
    radius: Number,
  },
});
</script>
