<template>
  <div>
    <a
      v-if="!running"
      href="#"
      @click.prevent="running = true">
      Click to start
    </a>

    <Countdown
      v-else
      :duration="5000"
      @complete="running = false" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Countdown } from '@/components'

export default defineComponent({
  setup() {
    const running = ref(false)

    return {
      running,
    }
  },
  components: {
    Countdown,
  },
  name: 'CountdownExample',
})
</script>
