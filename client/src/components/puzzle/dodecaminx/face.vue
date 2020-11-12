<template>
  <v-shape
    v-if="centerShape"
    :geometry="centerShape"
    :hidden="isHidden(face.center)"
    :inner-material="materials[face.center.value].inner"
    :outer-material="materials[face.center.value].outer" />
  <v-group
    v-for="i in [0, 1, 2, 3, 4]"
    :key="i"
    :rotation="[0, 0, 1, 72 * i]">
    <v-shape
      v-for="(sticker, j) in face.corners[i]"
      :geometry="cornerShapes[j]"
      :hidden="isHidden(sticker)"
      :inner-material="innerMaterial(sticker.value)"
      :key="`corner-${j}`"
      :outer-material="outerMaterial(sticker.value)" />
    <v-shape
      v-for="(sticker, j) in face.middles[i]"
      :geometry="middleShapes[j]"
      :hidden="isHidden(sticker)"
      :inner-material="innerMaterial(sticker.value)"
      :key="`middle-${j}`"
      :outer-material="outerMaterial(sticker.value)" />
  </v-group>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { Dodecaminx } from '@bedard/twister';
import { DodecaminxFace, DodecaminxSticker } from '@bedard/twister/dist/dodecaminx/dodecaminx';
import { Material, ShapeBufferGeometry } from 'three';
import VGroup from '@/components/three/utils/group.vue';
import VShape from '@/components/three/utils/shape.vue';

export default defineComponent({
  setup(props) {
    const face = computed(() => props.model.state[props.faceKey]);
    const innerMaterial = (val: number) => props.materials[val]?.inner;
    const outerMaterial = (val: number) => props.materials[val]?.outer;

    const isHidden = (obj: DodecaminxSticker<unknown>) => !props.visibleStickers.includes(obj);

    return {
      face,
      innerMaterial,
      isHidden,
      outerMaterial,
    };
  },
  components: {
    VGroup,
    VShape,
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
    faceKey: {
      required: true,
      type: String as PropType<DodecaminxFace>,
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
    visibleStickers: {
      required: true,
      type: Array as PropType<DodecaminxSticker<unknown>[]>,
    },
  },
});
</script>
