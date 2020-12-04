import { computed } from 'vue';
import { currentUser } from '@/app/store/user/state';
import { cubeConfig, dodecaminxConfig, isCube, isDodecaminx, getPuzzleId } from '@/app/utils/puzzle';

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
