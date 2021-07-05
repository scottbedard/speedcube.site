<template>
  <div v-text="Math.ceil(timeRemaining / 1000)" />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useRafFn } from '@vueuse/core'

export default defineComponent({
  setup(props, { emit }) {
    const now = ref(Date.now())
    
    const startAt = Date.now()

    const timeRemaining = computed(() => (startAt + props.duration) - now.value)

    const { pause } = useRafFn(() => {
      now.value = Date.now()

      if (timeRemaining.value <= 0) {
        emit('complete')
        pause()
      }
    })

    return {
      timeRemaining,
    }
  },
  emits: [
    'complete',
  ],
  name: 'Countdown',
  props: {
    duration: {
      required: true,
      type: Number,
    },
  },
})
</script>