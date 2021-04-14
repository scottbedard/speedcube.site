<template>
  <Scene square>
    Hello
  </Scene>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Scene } from '@/three'

export default defineComponent({
  setup() {
    
  },
  components: {
    Scene,
  },
  name: 'Puzzle',
})
</script>
