<template>
  <Scene
    :camera-angle="cameraAngle"
    :camera-distance="cameraDistance"
    square>
    <AxesHelper :size="1" />
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
import { AxesHelper, Scene } from '@/three/components'
import { defineComponent, ref } from 'vue'
import RangeInput from './RangeInput.vue'

export default defineComponent({
  setup() {
    const cameraAngle = ref(0)
    const cameraDistance = ref(0)

    return {
      cameraAngle,
      cameraDistance,
    }
  },
  components: {
    AxesHelper,
    RangeInput,
    Scene,
  },
  name: 'Puzzle',
})
</script>
