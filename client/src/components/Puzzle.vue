<template>
  <Scene square>
    <AxesHelper :size="1" />
  </Scene>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AxesHelper, Scene } from '@/three/components'

export default defineComponent({
  setup() {
    
  },
  components: {
    AxesHelper,
    Scene,
  },
  name: 'Puzzle',
})
</script>
