<template>
  <slot />
</template>

<script lang="ts">
import { Color, AmbientLight } from 'three'
import { defineComponent } from 'vue'
import { useNesting } from '@/three/behaviors'

export default defineComponent({
  setup(props) {
    const color = new Color(props.color)
    const light = new AmbientLight(color, props.intensity)

    useNesting(light)
  },
  name: 'AmbientLight',
  props: {
    color: {
      default: 0xffffff,
      type: [Number, String],
    },
    intensity: {
      default: 1,
      type: Number,
    },
  },
})
</script>
