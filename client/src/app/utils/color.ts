/**
 * Common colors used by default configurations
 */
export const colors: Record<string, string> = {
  blue: '#2563EB',
  creme: '#fbd38d',
  gray: '#718096',
  green: '#059669',
  lightBlue: '#90cdf4',
  lightGreen: '#9ae6b5',
  orange: '#ed8836',
  pink: '#f687b3',
  purple: '#9f7aea',
  red: '#e53e3e',
  white: '#f7fafc',
  yellow: '#f6e05e',
};

/**
 * Convert hex string to HSV values.
 */
export function hexToHsv(hex: string): [number, number, number] {
  return rgbToHsv(...hexToRgb(hex));
}

/**
 * Convert hex string to RGB values.
 */
export function hexToRgb(hex: string): [number, number, number] {
  if (isHexColor(hex)) {
    const chars = hex.replace('#', '').toLowerCase();

    if (chars.length === 3) {
      return [
        parseInt(chars[0].repeat(2), 16),
        parseInt(chars[1].repeat(2), 16),
        parseInt(chars[2].repeat(2), 16),
      ];
    }

    if (chars.length === 6) {
      return [
        parseInt(chars.slice(0, 2), 16),
        parseInt(chars.slice(2, 4), 16),
        parseInt(chars.slice(4), 16),
      ];
    }
  }

  throw new Error('Invalid color');
}

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
 * Test if a string is an acceptable color value.
 */
export function isHexColor(str: string): boolean {
  return str.match(/^#?([0-9a-f]{3}){1,2}$/i) !== null;
}
 
/**
 * Convert RGB to hex
 */
export function rgbToHex(red: number, green: number, blue: number) {
  const toHexChar = (n: number) => n.toString(16).padStart(2, '0');

  return `#${toHexChar(red)}${toHexChar(green)}${toHexChar(blue)}`;
}

/**
 * Convert RGB to HSV
 */
export function rgbToHsv (red: number, green: number, blue: number): [number, number, number] {
  red = red / 255;
  green = green / 255;
  blue = blue / 255;

  const min = Math.min(Math.min(red, green), blue);
  const max = Math.max(Math.max(red, green), blue);
  const value = max;

  // gray
  if (max - min === 0) {
    return [0, 0, value];
  }

  // hue
  let hue;

  if (max === red) {
    hue = (60 * ((green - blue) / (max - min))) % 360;
  } else if (max === green) {
    hue = 60 * ((blue - red) / (max - min)) + 120;
  } else {
    hue = 60 * ((red - green) / (max - min)) + 240;
  }

  if (hue < 0) {
    hue += 360;
  }

  // saturation
  const saturation = 1 - (min / max);

  return [hue / 360, saturation, value];
}
