import { isUndefined } from 'lodash-es';
/* eslint-disable no-param-reassign */
import { Object3D } from 'three';
import { watchEffect } from '@vue/composition-api';
import { getValue } from './helpers';
import { PossiblyReactive } from './types';

/**
 * Hidden
 */
export function useHidden(obj: Object3D, hidden?: PossiblyReactive<boolean>) {
  if (!isUndefined(hidden)) {
    watchEffect(() => {
      obj.visible = !getValue(hidden);
    });
  }
}
