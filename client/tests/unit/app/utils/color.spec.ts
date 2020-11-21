import {
  hsvToHex,
  hsvToRgb,
  rgbToHex,
} from '@/app/utils/color';

describe('color utils', () => {
  it('hsvToRgb', () => {
    expect(hsvToHex(0, 0, 0)).toEqual('#000000');
    expect(hsvToHex(0, 0, 1)).toEqual('#ffffff');
  });

  it('hsvToRgb', () => {
    expect(hsvToRgb(0, 0, 0)).toEqual([0, 0, 0]);
    expect(hsvToRgb(0, 0, 1)).toEqual([255, 255, 255]);
    expect(hsvToRgb(0, 0, 1 / 2)).toEqual([128, 128, 128]);
    expect(hsvToRgb(0, 1, 1)).toEqual([255, 0, 0]);
    expect(hsvToRgb(1 / 3, 1, 1)).toEqual([0, 255, 0]);
    expect(hsvToRgb(2 / 3, 1, 1)).toEqual([0, 0, 255]);
    expect(hsvToRgb(1 / 6, 1, 1)).toEqual([255, 255, 0]);
    expect(hsvToRgb(1 / 2, 1, 1)).toEqual([0, 255, 255]);
    expect(hsvToRgb(5 / 6, 1, 1)).toEqual([255, 0, 255]);
  });

  it('rgbToHex', () => {
    expect(rgbToHex(0, 0, 0)).toBe('#000000');
    expect(rgbToHex(255, 255, 255)).toBe('#ffffff');
    expect(rgbToHex(255, 0, 0)).toBe('#ff0000');
    expect(rgbToHex(0, 255, 0)).toBe('#00ff00');
    expect(rgbToHex(0, 0, 255)).toBe('#0000ff');
    expect(rgbToHex(186, 218, 85)).toBe('#bada55');
  });
});
