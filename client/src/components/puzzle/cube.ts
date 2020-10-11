import { Cube } from '@bedard/twister';
import { isNumber } from 'lodash';
import { useAxesHelper } from '@/app/three/utils/axes-helper';
import { useBoxGeometry } from '@/app/three/geometries/box-geometry';
import { useGroup } from '@/app/three/utils/group';

// edge length of a cube inscribed in a sphere of radius 1
const edgeLength = 2 / Math.sqrt(3);

// normalize cube options
function normalize(opts: Record<string, any>) {
  return {
    innerBrightness: isNumber(opts.innerBrightness) ? opts.innerBrightness : 0,
    stickerElevation: isNumber(opts.stickerElevation) ? opts.stickerElevation : 0,
    stickerRadius: isNumber(opts.stickerRadius) ? opts.stickerRadius : 0,
    stickerSpacing: isNumber(opts.stickerSpacing) ? opts.stickerSpacing : 0,
    turnDuration: isNumber(opts.turnDuration) ? opts.turnDuration : 200,
  };
}

/**
 * Cube
 */
export function useCube(model: Cube<Record<string, any>>, rawOpts: Record<string, any>) {
  const opts = normalize(rawOpts);

  console.log('cube', opts);

  return useGroup([
    useBoxGeometry({
      debug: true,
      size: {
        depth: edgeLength,
        height: edgeLength,
        width: edgeLength,
      },
      slots: {
        top: useAxesHelper(),
        left: useAxesHelper(),
        front: useAxesHelper(),
        right: useAxesHelper(),
        back: useAxesHelper(),
        down: useAxesHelper(),
      },
    }),
  ]);
}
