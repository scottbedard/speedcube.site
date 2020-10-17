<template>
  <slot />
  <v-group :position="{ y: halfHeight }" :rotation="[1, 0, 0, 90]">
    <slot name="up" />
  </v-group>
  <v-group :position="{ x: -halfWidth }" :rotation="[0, 1, 0, 90]">
    <slot name="left" />
  </v-group>
  <v-group :position="{ z: halfDepth }">
    <slot name="front" />
  </v-group>
  <v-group :position="{ x: halfWidth }" :rotation="[0, 1, 0, -90]">
    <slot name="right" />
  </v-group>
  <v-group :position="{ z: -halfDepth }" :rotation="[0, 1, 0, 180]">
    <slot name="back" />
  </v-group>
  <v-group :position="{ y: -halfHeight }" :rotation="[1, 0, 0, -90]">
    <slot name="back" />
  </v-group>
</template>

<script lang="ts">
/* eslint-disable */
import { BoxGeometry, Group, Mesh, MeshBasicMaterial } from 'three';
import { computed, defineComponent, PropType, watchEffect } from 'vue';
import { isNumber, stubObject } from 'lodash-es';
import { useNesting } from '@/app/three/utils/nestable';
import { usePosition } from '@/app/three/utils/position';
import { Rotation, useRotation } from '@/app/three/utils/rotation';
import { Vector } from '@/app/three/types';
import VGroup from '@/components/three/utils/group.vue';

interface Dimensions {
  depth: number,
  height: number,
  width: number,
}

const normalize = (dimensions: number | Partial<Dimensions>): Dimensions => {
  return isNumber(dimensions)
    ? {
      depth: dimensions,
      height: dimensions,
      width: dimensions,
    } : {
      depth: dimensions.depth || 0,
      height: dimensions.height || 0,
      width: dimensions.width || 0,
    };
}

export default defineComponent({
  setup(props) {
    const dimensions = computed(() => normalize(props.dimensions));
    const halfDepth = computed(() => dimensions.value.depth / 2);
    const halfHeight = computed(() => dimensions.value.height / 2);
    const halfWidth = computed(() => dimensions.value.width / 2);

    const group = new Group;
    useNesting(group);
    usePosition(group, () => props.position);
    useRotation(group, () => props.rotation);

    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0x666666, wireframe: true });
    const cube = new Mesh(geometry, material);
    group.add(cube);

    watchEffect(() => {
      const { depth, height, width } = dimensions.value;
      cube.scale.set(width, height, depth);
    });

    return {
      halfDepth,
      halfHeight,
      halfWidth,
    };
  },
  components: {
    VGroup,
  },
  props: {
    dimensions: {
      default: 1,
      type: [Number, Object] as PropType<number | Partial<Dimensions>>,
    },
    position: {
      default: stubObject,
      type: Object as PropType<Partial<Vector>>,
    },
    rotation: {
      default: () => [0, 0, 0, 0],
      type: Array as unknown as PropType<Rotation>,
    },
  },
});
</script>
