<template>
  <slot />
</template>

<script lang="ts">
import { Color, PointLight } from 'three';
import { defineComponent } from 'vue';
import { positionProp, usePosition } from '@/app/three/utils/position';
import { useNesting } from '@/app/three/utils/nestable';

export default defineComponent({
  setup(props) {
    const color = new Color(props.color);
    const light = new PointLight(color, props.intensity);

    useNesting(light);
    usePosition(light, () => props.position);
  },
  props: {
    color: {
      default: '#ffffff',
      type: [Number, String],
    },
    intensity: {
      default: 1,
      type: Number,
    },
    position: positionProp,
  },
});
</script>
