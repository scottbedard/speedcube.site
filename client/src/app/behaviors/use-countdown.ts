import { MaybeRef, useNow } from '@vueuse/core'
import { computed, ref, unref, watch } from 'vue'

/**
 * Count down for a given duration.
 */
export function useCountdown(duration: MaybeRef<number>, callback: () => void) {
  const {
    now,
    pause,
    resume: resumeNow,
  } = useNow({ controls: true })

  const endAt = ref(0)

  const started = ref(false)

  const timeRemaining = computed(() => {
    return started.value
      ? Math.max(0, endAt.value - now.value.getTime())
      : unref(duration)
  })

  const reset = () => {
    pause()

    started.value = false
  }

  const resume = () => {
    endAt.value = new Date().getTime() + (started.value ? timeRemaining.value : unref(duration))

    started.value = true
    
    resumeNow()
  }

  watch(timeRemaining, (value) => {
    if (value === 0) {
      pause()
      callback()
    }
  })

  return {
    pause,
    reset,
    resume,
    timeRemaining,
  }
}
