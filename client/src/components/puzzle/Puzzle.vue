<template>
  <Scene
    :camera-angle="cameraAngle"
    :camera-distance="cameraDistance"
    square>
    <Cube />
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
import Cube from './cube/Cube.vue'
import RangeInput from '../RangeInput.vue'

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
    Cube,
    RangeInput,
    Scene,
  },
  name: 'Puzzle',
})
</script>
