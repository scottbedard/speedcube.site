import { computed } from 'vue';
import { currentUser } from '@/app/store/user/state';
import {
  cubeConfig,
  cubeKeyboardConfig,
  dodecaminxConfig,
  dodecaminxKeyboardConfig,
  getPuzzleId,
  isCube,
  isDodecaminx,
} from '@/app/utils/puzzle';

import { KeyboardConfig } from '@/types/puzzle';
import { cloneDeep } from 'lodash-es';

/**
 * Get a puzzle config.
 */
export const config = computed(() => {
  return (name: string): Record<string, any> => {
    name = name.trim().toLowerCase();

    const id = getPuzzleId(name);

    const defaultConfig = isCube(name) ? cubeConfig
      : isDodecaminx(name) ? dodecaminxConfig
      : {};

    const userConfig = currentUser.value?.activeConfigs
      .find(obj => obj.puzzleId === id)?.data ?? {};

    return { ...defaultConfig, ...userConfig };
  };
});

/**
 * Current user avatar
 */
export const currentUserAvatar = computed(() => currentUser.value?.avatar);

/**
 * Test if the current user is authenticated.
 */
export const isAuthenticated = computed(() => currentUser.value !== null);

/**
 * Get a keyboard config.
 */
export const keyboardConfig = computed(() => {
  return (name: string): KeyboardConfig => {
    name = name.trim().toLowerCase();

    const id = getPuzzleId(name);

    const userKeyboardConfig = currentUser.value?.keyboardConfigs.find(obj => obj.puzzleId === id);

    if (userKeyboardConfig) {
      return JSON.parse(userKeyboardConfig.data) as KeyboardConfig;
    } else if (isCube(name)) {
      return cloneDeep(cubeKeyboardConfig);
    } else if (isDodecaminx(name)) {
      return cloneDeep(dodecaminxKeyboardConfig);
    }

    return {
      default: {},
      keyspaces: {},
    };
  }
});
