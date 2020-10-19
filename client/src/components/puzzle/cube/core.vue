<template>
  <v-box-geometry
    hidden
    :dimensions="edgeLength"
    :rotation="rotation">
    <template #up>
      <v-face
        :geometry="geometry"
        :materials="materials"
        :sticker-position="stickerPosition"
        :stickers="model.state.u"
        :visible-stickers="visibleStickers" />
    </template>
    <template #left>
      <v-face
        :geometry="geometry"
        :materials="materials"
        :sticker-position="stickerPosition"
        :stickers="model.state.l"
        :visible-stickers="visibleStickers" />
    </template>
    <template #front>
      <v-face
        :geometry="geometry"
        :materials="materials"
        :sticker-position="stickerPosition"
        :stickers="model.state.f"
        :visible-stickers="visibleStickers" />
    </template>
    <template #right>
      <v-face
        :geometry="geometry"
        :materials="materials"
        :sticker-position="stickerPosition"
        :stickers="model.state.r"
        :visible-stickers="visibleStickers" />
    </template>
    <template #back>
      <v-face
        :geometry="geometry"
        :materials="materials"
        :sticker-position="stickerPosition"
        :stickers="model.state.b"
        :visible-stickers="visibleStickers" />
    </template>
    <template #down>
      <v-face
        :geometry="geometry"
        :materials="materials"
        :sticker-position="stickerPosition"
        :stickers="model.state.d"
        :visible-stickers="visibleStickers" />
    </template>
  </v-box-geometry>
</template>

<script lang="ts">
import { Cube, CubeSticker } from '@bedard/twister';
import { defineComponent, PropType } from 'vue';
import { Material, ShapeBufferGeometry } from 'three';
import { rotationProp } from '@/app/three/behaviors/rotation';
import { Vector } from '@/app/three/types';
import VBoxGeometry from '@/components/three/geometries/box-geometry.vue';
import VFace from './face.vue';

type StickerData = Record<string, unknown>;

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
    rotation: rotationProp,
    stickerPosition: {
      required: true,
      type: Function as PropType<(index: number) => Partial<Vector>>,
    },
    visibleStickers: {
      required: true,
      type: Array as PropType<CubeSticker<StickerData>[]>,
    },
  },
});
</script>
