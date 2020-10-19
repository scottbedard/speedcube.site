<template>
  <v-box-geometry :dimensions="edgeLength">
    <template #up>
      <v-face
        :geometry="geometry"
        :materials="materials"
        :sticker-position="stickerPosition"
        :stickers="model.state.u" />
    </template>
    <template #left>
      <v-face
        :geometry="geometry"
        :materials="materials"
        :sticker-position="stickerPosition"
        :stickers="model.state.l" />
    </template>
    <template #front>
      <v-face
        :geometry="geometry"
        :materials="materials"
        :sticker-position="stickerPosition"
        :stickers="model.state.f" />
    </template>
    <template #right>
      <v-face
        :geometry="geometry"
        :materials="materials"
        :sticker-position="stickerPosition"
        :stickers="model.state.r" />
    </template>
    <template #back>
      <v-face
        :geometry="geometry"
        :materials="materials"
        :sticker-position="stickerPosition"
        :stickers="model.state.b" />
    </template>
    <template #down>
      <v-face
        :geometry="geometry"
        :materials="materials"
        :sticker-position="stickerPosition"
        :stickers="model.state.d" />
    </template>
  </v-box-geometry>
</template>

<script lang="ts">
import { Cube } from '@bedard/twister';
import { defineComponent, PropType } from 'vue';
import { Material, ShapeBufferGeometry } from 'three';
import { Vector } from '@/app/three/types';
import VBoxGeometry from '@/components/three/geometries/box-geometry.vue';
import VFace from './face.vue';

export default defineComponent({
  components: {
    VBoxGeometry,
    VFace,
  },
  props: {
    edgeLength: {
      required: true,
      type: Number,
    },
    geometry: {
      required: true,
      type: Object as PropType<ShapeBufferGeometry>,
    },
    materials: {
      required: true,
      type: Array as PropType<Material[]>,
    },
    model: {
      required: true,
      type: Object as PropType<Cube>,
    },
    stickerPosition: {
      required: true,
      type: Function as PropType<(index: number) => Partial<Vector>>,
    },
  },
});
</script>
