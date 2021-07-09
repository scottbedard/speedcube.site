<template>
  <div
    v-text="stopwatch"
    class="font-mono text-4xl" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { formatTime } from '@/app/utils'

export default defineComponent({
  setup(props) {
    const stopwatch = computed(() => formatTime(props.solveTime))

    return {
      stopwatch,
    }
  },
  name: 'GameplaySolving',
  props: {
    solveTime: {
      required: true,
      type: Number,
    },
  },
})
</script>
