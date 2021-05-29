import { onUnmounted } from 'vue'
import { pull } from 'lodash-es'

/**
 * Component-bound timeout functions
 */
export function useComponentTimeout() {
  const timers: number[] = [];

  const clear = (timer: number) => {
    clearTimeout(timer)

    pull(timers, timer)
  }

  /**
   * Set a timeout function that will only fire if the component is still mounted.
   */
  const setComponentTimeout = <T>(fn: (...args: T[]) => void, delay: number, ...args: T[]) => {
    const timer = setTimeout(() => {
      fn(...args)
      clear(timer)
    }, delay)

    timers.push(timer)

    return timer
  }

  onUnmounted(() => {
    timers.forEach(clear)
  })

  return {
    setComponentTimeout,
  }
}
