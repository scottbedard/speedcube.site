import { Color } from 'three';
import { watchEffect } from 'vue';

interface Colored {
  color: Color,
}

/**
 * Color prop
 */
export const colorProp = {
  default: 0xffffff,
  type: [Number, String],
};

/**
 * Color
 */
export function useColor(obj: Colored, color: () => number | string | Color) {
  watchEffect(() => obj.color.set(color()));
}
