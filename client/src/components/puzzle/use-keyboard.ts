import { computed, ref, unref } from 'vue'
import { KeyboardConfig } from '@/app/types/puzzle'
import { MaybeRef } from '@vueuse/core'

/**
 * Use a keyboard config.
 */
export function useKeyboard(rawKeyboardConfig: MaybeRef<KeyboardConfig | null>) {
  /**
   * Currently selected keyspace
   */
  const activeKeyspace = ref<string | null>(null)

  /**
   * Key bindings that are part of the active keyspace
   */
  const currentBindings = computed(() => {
    const keyboardConfig = unref(rawKeyboardConfig) ?? {
      default: {},
      keyspaces: {},
    }

    return {
      ...keyboardConfig.default,
      ...(activeKeyspace.value ? keyboardConfig.keyspaces[activeKeyspace.value] : {})
    }
  })

  return {
    activeKeyspace,
    currentBindings,
  }
}
