import { uniquePath } from '@/app/utils/geometry';

describe('geometry utils', () => {
  it('uniquePath', () => {
    // head, middle, tail
    expect(
      uniquePath([[0, 0], [0, 0], [1, 1], [2, 2]]),
    ).toEqual([
      [0, 0], [1, 1], [2, 2],
    ]);

    expect(
      uniquePath([[0, 0], [1, 1], [1, 1], [2, 2]]),
    ).toEqual([
      [0, 0], [1, 1], [2, 2],
    ]);

    expect(
      uniquePath([[0, 0], [1, 1], [0, 0]]),
    ).toEqual([
      [0, 0], [1, 1],
    ]);

    // no duplicates
    expect(
      uniquePath([[0, 0], [1, 1], [2, 2]]),
    ).toEqual([
      [0, 0], [1, 1], [2, 2],
    ]);
  });
});
