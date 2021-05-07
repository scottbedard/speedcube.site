// eslint-disable
import { KeyboardConfig } from '@/app/types/puzzle'
import { MaybeRef } from '@vueuse/core'
import { computed, ref, unref } from 'vue'

/**
 * Keyboard bindings for a puzzle.
 */
export function useKeyboard(config: MaybeRef<KeyboardConfig>) {
  const keyspace = ref<string | null>(null)

  const defaultBindings = computed(() => {
    return unref(config).default || {}
  })

  const keyspaceBindings = computed(() => {
    return {
      ...defaultBindings.value,
      ...(keyspace.value && unref(config).keyspaces[keyspace.value])
    }
  })
  
  return {
    keyspace,
    keyspaceBindings,
  }
}
