<template>
  <slot />
</template>

<script lang="ts">
import { Color, AmbientLight } from 'three';
import { defineComponent } from 'vue';
import { useNesting } from '@/app/three/utils/nestable';

export default defineComponent({
  setup(props) {
    const color = new Color(props.color);
    const light = new AmbientLight(color, props.intensity);

    useNesting(light);
  },
  props: {
    color: {
      default: '#fff',
      type: [Number, String],
    },
    intensity: {
      default: 1,
      type: Number,
    },
  },
});
</script>
