// eslint-disable
import { KeyboardConfig } from '@/app/types/puzzle'
import { MaybeRef } from '@vueuse/core'
import { ref } from 'vue'

/**
 * Keyboard bindings for a puzzle.
 */
export function useKeyboard(config: MaybeRef<KeyboardConfig>) {
  const keyspace = ref<string | null>(null)

  return {
    keyspace
  }
}
