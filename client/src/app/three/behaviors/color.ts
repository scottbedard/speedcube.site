import { Color } from 'three';
import { watchEffect } from 'vue';

interface Colored {
  color: Color,
}

/**
 * Color
 */
export function useColor(obj: Colored, color: () => number | string | Color) {
  watchEffect(() => obj.color.set(color()));
}
