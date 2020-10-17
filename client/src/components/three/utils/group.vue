<template>
  <slot />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Group } from 'three';
import { useNesting } from '@/app/three/nesting';
import { positionProp, usePosition } from '@/app/three/position';
import { useRotation } from '@/app/three/rotation';

export default defineComponent({
  setup(props) {
    const group = new Group;

    useNesting(group);
    usePosition(group, () => props.position);
    useRotation(group, () => props.rotation);
  },
  props: {
    position: positionProp,
    rotation: {
      default: () => [0, 0, 0, 0],
      type: Array as unknown as PropType<[number, number, number, number]>,
    },
  },
});
</script>
