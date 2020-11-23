import {
  cubeSize,
  dodecaminxSize,
  isCube,
  isDodecaminx,
} from '@/app/utils/puzzle';

describe('puzzle utils', () => {
  it('cubeSize', () => {
    expect(cubeSize('2x2')).toBe(2);
    expect(cubeSize('3x3')).toBe(3);
    expect(cubeSize('4x4')).toBe(4);
    expect(cubeSize('5x5')).toBe(5);
  });

  it('dodecaminxSize', () => {
    expect(dodecaminxSize('kilominx')).toBe(2);
    expect(dodecaminxSize('megaminx')).toBe(3);
    expect(dodecaminxSize('masterminx')).toBe(4);
    expect(dodecaminxSize('gigaminx')).toBe(5);
  });

  it('isCube', () => {
    expect(isCube('2x2')).toBe(true);
    expect(isCube('3x3')).toBe(true);
    expect(isCube('4x4')).toBe(true);
    expect(isCube('5x5')).toBe(true);
    expect(isCube('not a cube')).toBe(false);
  });

  it('isDodecaminx', () => {
    expect(isDodecaminx('kilominx')).toBe(true);
    expect(isDodecaminx('megaminx')).toBe(true);
    expect(isDodecaminx('masterminx')).toBe(true);
    expect(isDodecaminx('gigaminx')).toBe(true);
    expect(isDodecaminx('not a dodecaminx')).toBe(false);
  });
});
