import { Object3D } from 'three';
import { usePosition } from './usePosition';
import { RawVectorObject } from './types';

type PropBinding = {
  name?: string;
  position?: RawVectorObject;
}

/**
 * Object3D bindings
 */
/* eslint-disable no-param-reassign */
export function useObject(obj: Object3D, props: PropBinding) {
  if (props.name) {
    obj.name = props.name;
  }

  usePosition(obj, props.position);
}
