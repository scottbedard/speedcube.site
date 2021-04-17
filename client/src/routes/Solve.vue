<template>
  <div class="max-w-lg mx-auto">
    <Puzzle
      :config="{
        ...defaultConfig,
        cameraAngle,
        cameraDistance,
      }"
      :model="model" />

    <div class="mt-6">
      <div>Camera Angle: {{ cameraAngle }}</div>
      <RangeInput v-model="cameraAngle" />
    </div>

    <div class="mt-6">
      <div>Camera Distance: {{ cameraDistance }}</div>
      <RangeInput v-model="cameraDistance" />
    </div>
  </div>
</template>

<script lang="ts">
import { Cube } from '@bedard/twister'
import { defaultConfig } from '@/components/puzzle/cube/constants'
import { defineComponent, ref } from 'vue'
import { Puzzle, RangeInput } from '@/components'

export default defineComponent({
  setup() {
    const cameraAngle = ref(25)
    const cameraDistance = ref(3)
    const model = new Cube({ size: 3 })

    return {
      cameraAngle,
      cameraDistance,
      defaultConfig,
      model,
    }
  },
  components: {
    Puzzle,
    RangeInput,
  },
  name: 'Solve'
})
</script>
