<template>
  <div class="max-w-sm mx-auto">
    <Puzzle
      :config="{
        ...cubeConfig,
        cameraAngle,
        cameraDistance,
      }"
      :model="model" />
  </div>
</template>

<script lang="ts">
import { Cube } from '@bedard/twister'
import { cubeConfig } from '@/components/puzzle/constants'
import { defineComponent, ref } from 'vue'
import { Puzzle } from '@/components'

export default defineComponent({
  setup() {
    const cameraAngle = ref(25)
    const cameraDistance = ref(3)
    const model = new Cube({ size: 3 })

    return {
      cameraAngle,
      cameraDistance,
      cubeConfig,
      model,
    }
  },
  components: {
    Puzzle,
  },
  name: 'Solve'
})
</script>
