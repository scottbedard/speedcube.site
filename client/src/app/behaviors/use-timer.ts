import { computed, ref } from 'vue'
import { useNow } from '@vueuse/core'

/**
 * Timer
 */
export function useTimer() {
  const {
    now,
    pause,
    resume: resumeNow,
  } = useNow({ controls: true })

  const startedAt = ref(0)

  const started = ref(false)

  const time = computed(() => {
    return started.value
      ? now.value.getTime() - startedAt.value
      : 0
  })

  const reset = () => {
    started.value = false

    pause()
  }

  const resume = () => {
    startedAt.value = Date.now() - (started.value ? time.value : 0)
  
    started.value = true

    resumeNow()
  }

  return {
    pause,
    reset,
    resume,
    time,
  }
}
