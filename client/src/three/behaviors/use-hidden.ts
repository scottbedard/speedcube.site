
import { watchEffect } from 'vue'

interface Hideable {
  visible: boolean
}

export const useHiddenProp = {
  default: false,
  type: Boolean,
}

/**
 * Hidden
 */
export function useHidden(obj: Hideable, hidden: () => boolean) {
  watchEffect(() => obj.visible = !hidden())
}