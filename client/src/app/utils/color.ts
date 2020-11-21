/**
 * Convert HSV to hex
 *
 * @param {number} hue value 0 to 1 representing the hue
 * @param {number} saturation value 0 to 1 representing saturation
 * @param {number} value value 0 to 1 representing lightness
 */
export function hsvToHex(hue: number, saturation: number, value: number) {
  return rgbToHex(...hsvToRgb(hue, saturation, value));
}

/**
 * Convert HSV to RGB
 *
 * @param {number} hue value 0 to 1 representing the hue
 * @param {number} saturation value 0 to 1 representing saturation
 * @param {number} value value 0 to 1 representing lightness
 */
export function hsvToRgb(hue: number, saturation: number, value: number): [number, number, number] {
  const i = Math.floor(hue * 6);
  const f = hue * 6 - i;
  const p = value * (1 - saturation);
  const q = value * (1 - f * saturation);
  const t = value * (1 - (1 - f) * saturation);

  let r = 0, g = 0, b = 0;

  switch (i % 6) {
    case 0:
      r = value, g = t, b = p;
      break;
    case 1:
      r = q, g = value, b = p;
      break;
    case 2:
      r = p, g = value, b = t;
      break;
    case 3:
      r = p, g = q, b = value;
      break;
    case 4:
      r = t, g = p, b = value;
      break;
    case 5:
      r = value, g = p, b = q;
      break;
  }

  return [
    Math.round(r * 255),
    Math.round(g * 255),
    Math.round(b * 255),
  ];
}
 
 /**
  * Convert RGB to hex
  */
export function rgbToHex(red: number, green: number, blue: number) {
  const toHexChar = (n: number) => n.toString(16).padStart(2, '0');

  return `#${toHexChar(red)}${toHexChar(green)}${toHexChar(blue)}`;
}
