import { watchEffect } from 'vue'

interface Hideable {
  visible: boolean
}

/**
 * Hidden prop
 */
export const hiddenProp = {
  default: false,
  type: Boolean,
};

/**
 * Hidden
 */
export function useHidden(obj: Hideable, hidden: () => boolean) {
  watchEffect(() => obj.visible = !hidden());
}
