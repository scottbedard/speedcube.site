<template>
  <div>
    <div class="text-4xl">
      <div v-if="status === 'dnf'">
        DNF
      </div>

      <div
        v-else
        v-text="timerText"
        class="font-mono" />
    </div>

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
    const timerText = computed(() => {
      return props.status === 'inspection'
        ? Math.ceil(props.inspectionTime / 1000)
        : formatTime(props.solveTime)
    })

    return {
      timerText,
    }
  },
  name: 'GameplaySolving',
  props: {
    inspectionTime: {
      required: true,
      type: Number,
    },
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
