<template>
  <v-dodecahedron-geometry geometry-hidden :radius="radius">
    <template
      v-for="face in Object.keys(model.state)"
      v-slot:[face]
      :key="face">
      <v-face
        :center-shape="centerShape"
        :corner-shapes="cornerShapes"
        :face-key="face"
        :materials="materials"
        :middle-shapes="middleShapes"
        :model="model" />
    </template>
  </v-dodecahedron-geometry>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Dodecaminx } from '@bedard/twister';
import { Material, ShapeBufferGeometry } from 'three';
import VDodecahedronGeometry from '@/components/three/geometries/dodecahedron-geometry.vue';
import VFace from './face.vue';

export default defineComponent({
  components: {
    VDodecahedronGeometry,
    VFace,
  },
  props: {
    centerShape: [Boolean, ShapeBufferGeometry] as PropType<false | ShapeBufferGeometry>,
    cornerShapes: Array as PropType<ShapeBufferGeometry[]>,
    materials: Array as PropType<{ inner: Material, outer: Material, }[]>,
    middleShapes: Array as PropType<ShapeBufferGeometry[]>,
    model: Object as PropType<Dodecaminx>,
    radius: Number,
  },
});
</script>
