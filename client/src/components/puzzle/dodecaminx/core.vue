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
        :model="model"
        :visible-stickers="visibleStickers" />
    </template>
  </v-dodecahedron-geometry>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Dodecaminx } from '@bedard/twister';
import { DodecaminxSticker } from '@bedard/twister/dist/dodecaminx/dodecaminx';
import { Material, ShapeBufferGeometry } from 'three';
import VDodecahedronGeometry from '@/components/three/geometries/dodecahedron-geometry.vue';
import VFace from './face.vue';

export default defineComponent({
  components: {
    VDodecahedronGeometry,
    VFace,
  },
  props: {
    centerShape: {
      required: true,
      type: [Boolean, ShapeBufferGeometry] as PropType<false | ShapeBufferGeometry>,
    },
    cornerShapes: {
      required: true,
      type: Array as PropType<ShapeBufferGeometry[]>,
    },
    materials: {
      required: true,
      type: Array as PropType<{ inner: Material, outer: Material, }[]>,
    },
    middleShapes: {
      required: true,
      type: Array as PropType<ShapeBufferGeometry[]>,
    },
    model: {
      required: true,
      type: Dodecaminx,
    },
    radius: {
      required: true,
      type: Number,
    },
    visibleStickers: {
      required: true,
      type: Array as PropType<DodecaminxSticker<unknown>[]>,
    },
  },
});
</script>
