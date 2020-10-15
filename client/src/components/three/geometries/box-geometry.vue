<template>
  <slot />
</template>

<script lang="ts">
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';
import { isNumber, stubObject } from 'lodash-es';
import { defineComponent, PropType, watchEffect } from 'vue';
import { useNesting } from '@/app/three/utils/nestable';
import { usePosition } from '@/app/three/utils/position';
import { Vector } from '@/app/three/types';

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
    const geometry = new BoxGeometry(1, 1, 1);

    const material = new MeshBasicMaterial({
      color: 0x666666,
      wireframe: true,
    });

    const cube = new Mesh(geometry, material);

    useNesting(cube);
    usePosition(cube, props.position);

    watchEffect(() => {
      const { depth, height, width } = normalize(props.dimensions);
      cube.scale.x = width;
      cube.scale.y = height;
      cube.scale.z = depth;
    });
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
  },
});
</script>
