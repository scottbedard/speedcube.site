<template>
  <Scene
    :camera-angle="cameraAngle"
    :camera-distance="cameraDistance"
    square>
    <BoxGeometry :dimensions="1">
      <template #up>
        <AxesHelper :size="0.5" />
      </template>
      <template #left>
        <AxesHelper :size="0.5" />
      </template>
      <template #front>
        <AxesHelper :size="0.5" />
      </template>
      <template #right>
        <AxesHelper :size="0.5" />
      </template>
      <template #back>
        <AxesHelper :size="0.5" />
      </template>
      <template #down>
        <AxesHelper :size="0.5" />
      </template>
    </BoxGeometry>
  </Scene>

  <div class="mt-6">
    <div>Camera Angle: {{ cameraAngle }}</div>
    <RangeInput v-model="cameraAngle" />
  </div>

  <div class="mt-6">
    <div>Camera Distance: {{ cameraDistance }}</div>
    <RangeInput v-model="cameraDistance" />
  </div>
</template>

<script lang="ts">
import { AxesHelper, BoxGeometry, Scene } from '@/three/components'
import { defineComponent, ref } from 'vue'
import RangeInput from './RangeInput.vue'

export default defineComponent({
  setup() {
    const cameraAngle = ref(25)
    const cameraDistance = ref(3)

    return {
      cameraAngle,
      cameraDistance,
    }
  },
  components: {
    AxesHelper,
    BoxGeometry,
    RangeInput,
    Scene,
  },
  name: 'Puzzle',
})
</script>
