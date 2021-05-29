import { computed, unref } from 'vue'
import { Keybinding } from '@/app/types/puzzle'
import { MaybeRef, useEventListener } from '@vueuse/core'

/**
 * Keybinding listener
 */
 export function useKeybindings(
  keybindings: MaybeRef<Record<string, string> | null>, 
  handler: (keybinding: Keybinding) => void,
) {
  const normalizedKeybindings = computed(() => unref(keybindings))

  useEventListener(window, 'keypress', (e) => {
    const turn = normalizedKeybindings.value?.[e.key]

    if (turn) {
      handler({ key: e.key, turn })
    }
  })
}
