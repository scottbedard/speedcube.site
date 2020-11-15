import {
  intersect,
  slope,
} from '@/app/utils/math';

describe('math', () => {
  it('intersect', () => {
    // cannot intersect parallel lines
    expect(() => intersect([[0, 0], [1, 1]], [[0, 0], [1, 1]])).toThrow();
    expect(() => intersect([[0, 0], [1, 1]], [[1, 1], [0, 0]])).toThrow();
    expect(() => intersect([[0, 0], [1, 0]], [[1, 1], [2, 1]])).toThrow();

    // first line is vertical
    const [x1, y1] = intersect([[1, 1], [1, -1]], [[-1, 2], [3, 1]]);
    expect(x1).toBe(1);
    expect(y1).toBe(1.5);

    // second line is vertical
    const [x2, y2] = intersect([[3, 1], [-1, -2]], [[1, 1], [1, 2]]);
    expect(x2).toBe(1);
    expect(y2).toBe(-0.5);

    // neither line is vertical
    const [x3, y3] = intersect([[0, 0], [1, 1]], [[0, 1], [1, 0]]);
    expect(x3).toBe(0.5);
    expect(y3).toBe(0.5);
    
    const [x4, y4] = intersect([[-2, 3], [4, -1]], [[-3, -1], [2, -2]]);
    expect(Math.round(x4)).toBe(7);
    expect(Math.round(y4)).toBe(-3);
  });

  it('slope', () => {
    expect(slope([0, 0], [1, 1])).toBe(1);
    expect(slope([1, 1], [0, 0])).toBe(1);
    expect(slope([0, 0], [2, 1])).toBe(0.5);
    expect(slope([1, 1], [2, 1])).toBe(0);
    expect(slope([0, 0], [1, -1])).toBe(-1);
  });
});
