import {
  hexToHsv,
  hexToRgb,
  hsvToHex,
  hsvToRgb,
  rgbToHex,
  rgbToHsv,
} from '@/app/utils/color';

interface Color {
  hex: string
  hsv: [number, number, number]
  rgb: [number, number, number]
}

const colors: Color[] = [
  {
    hex: '#000000',
    hsv: [0, 0, 0], 
    rgb: [0, 0, 0],
  },
  {
    hex: '#ffffff',
    hsv: [0, 0, 1], 
    rgb: [255, 255, 255],
  },
  {
    hex: '#808080',
    hsv: [0, 0, 128 / 255], 
    rgb: [128, 128, 128],
  },
  {
    hex: '#ff0000',
    hsv: [0, 1, 1], 
    rgb: [255, 0, 0],
  },
  {
    hex: '#00ff00',
    hsv: [1 / 3, 1, 1], 
    rgb: [0, 255, 0],
  },
  {
    hex: '#0000ff',
    hsv: [2 / 3, 1, 1], 
    rgb: [0, 0, 255],
  },
  {
    hex: '#ffff00',
    hsv: [1 / 6, 1, 1], 
    rgb: [255, 255, 0],
  },
  {
    hex: '#00ffff',
    hsv: [1 / 2, 1, 1], 
    rgb: [0, 255, 255],
  },
  {
    hex: '#ff00ff',
    hsv: [5 / 6, 1, 1], 
    rgb: [255, 0, 255],
  },
];

describe('color utils', () => {
  it('hexToHsv', () => {
    expect(() => hexToHsv('not a color')).toThrow();

    colors.forEach(({ hex, hsv }) => {
      expect(hexToHsv(hex)).toEqual(hsv);
    })
  });

  it('hexToRgb', () => {
    expect(() => hexToRgb('not a color')).toThrow();

    colors.forEach(({ hex, rgb }) => {
      expect(hexToRgb(hex)).toEqual(rgb);
    })
  });

  it('hsvToHex', () => {
    colors.forEach(({ hex, hsv }) => {
      expect(hsvToHex(...hsv)).toBe(hex);
    });
  });

  it('hsvToRgb', () => {
    colors.forEach(({ hsv, rgb }) => {
      expect(hsvToRgb(...hsv)).toEqual(rgb);
    });
  });

  it('rgbToHex', () => {
    colors.forEach(({ hex, rgb }) => {
      expect(rgbToHex(...rgb)).toEqual(hex);
    });
  });

  it('rgbToHsv', () => {
    colors.forEach(({ hsv, rgb }) => {
      expect(rgbToHsv(...rgb)).toEqual(hsv);
    });
  });
});
