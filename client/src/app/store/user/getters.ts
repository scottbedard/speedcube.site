import { computed } from 'vue';
import { currentUser } from '@/app/store/user/state';
import {
  cubeConfig,
  dodecaminxConfig,
  getPuzzleId,
  isCube,
  isDodecaminx,
} from '@/app/utils/puzzle';

import { KeyboardConfig } from '@/types/puzzle';

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
 * Test if the current user is authenticated.
 */
export const isAuthenticated = computed(() => currentUser.value !== null);

/**
 * Get a keyboard config.
 */
/* eslint-disable */
export const keyboardConfig = computed(() => {
  return (name: string): KeyboardConfig => {
    const id = getPuzzleId(name);

    const userKeyboardConfig = currentUser.value?.keyboardConfigs.find(obj => obj.puzzleId === id);

    if (userKeyboardConfig) {
      return userKeyboardConfig.data as KeyboardConfig;
    }
    

    return {
      default: {},
      keyspaces: {},
    };
  }
});
