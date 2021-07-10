<template>
  <div>
    <div
      v-text="stopwatch"
      class="font-mono text-4xl" />

    <div v-if="status === 'complete'">
      Complete!
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { formatTime } from '@/app/utils'
import { SolvingStatus } from '@/app/behaviors/use-solving'

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
    status: {
      required: true,
      type: String as PropType<SolvingStatus>,
    },
  },
})
</script>
