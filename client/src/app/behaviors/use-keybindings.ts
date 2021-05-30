import { computed, unref } from 'vue'
import { Keybinding } from '@/app/types/puzzle'
import { MaybeRef, useEventListener } from '@vueuse/core'

let enabled = true

/**
 * Turn off keybinding listener
 */
export function disableKeybindingListener() {
  enabled = false
}

/**
 * Turn on keybinding listener
 */
export function enableKeybindingListener() {
  enabled = true
}

/**
 * Keybinding listener
 */
export function useKeybindings(
  keybindings: MaybeRef<Record<string, string> | null>, 
  handler: (keybinding: Keybinding) => void,
) {
  const normalizedKeybindings = computed(() => unref(keybindings))

  useEventListener(window, 'keypress', (e) => {
    if (enabled) {
      const turn = normalizedKeybindings.value?.[e.key]
  
      if (turn) {
        handler({ key: e.key, turn })
      }
    }
  })
}
