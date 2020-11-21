/**
 * Convert HSV to RGB
 */
export function hsvToRgb(hue: number, saturation: number, value: number) {
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