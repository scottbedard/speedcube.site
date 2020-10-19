import { watchEffect } from 'vue'

interface Hideable {
  visible: boolean
}

/**
 * Hidden
 */
export function useHidden(obj: Hideable, hidden: () => boolean) {
  watchEffect(() => obj.visible = !hidden());
}
