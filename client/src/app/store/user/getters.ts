/* eslint-disable */
import { computed } from 'vue';
import { currentUser } from '@/app/store/user/state';
import { cubeConfig, dodecaminxConfig, isCube, isDodecaminx, puzzleIds } from '@/app/utils/puzzle';

/**
 * Get a puzzle config.
 */
export const userPuzzleConfig = computed(() => {
  return (name: string): Record<string, any> => {
    name = name.trim().toLowerCase();

    if (isCube(name)) {
      const id = puzzleIds[name];
      const userConfig = currentUser.value?.puzzleConfigs
        .find(obj => obj.puzzleId === id);
  
      return { ...cubeConfig, ...userConfig }
    }

    if (isDodecaminx(name)) {
      const id = puzzleIds[name];
      const userConfig = currentUser.value?.puzzleConfigs
        .find(obj => obj.puzzleId === id);
  
      return { ...dodecaminxConfig, ...userConfig }
    }

    return {};
  };
});

/**
 * Test if the current user is authenticated.
 */
export const isAuthenticated = computed(() => currentUser.value !== null);
