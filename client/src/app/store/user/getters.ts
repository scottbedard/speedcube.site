import { computed } from 'vue';
import { currentUser } from '@/app/store/user/state';
import { cubeConfig, dodecaminxConfig, isCube, isDodecaminx, puzzleIds } from '@/app/utils/puzzle';

/**
 * Get a puzzle config.
 */
export const config = computed(() => {
  return (name: string): Record<string, any> => {
    name = name.trim().toLowerCase();

    if (isCube(name)) {
      const id = puzzleIds[name];
      const config = currentUser.value?.configs.find(obj => obj.puzzleId === id);

      return { ...cubeConfig, ...config }
    }

    if (isDodecaminx(name)) {
      const id = puzzleIds[name];
      const config = currentUser.value?.configs.find(obj => obj.puzzleId === id);
  
      return { ...dodecaminxConfig, ...config }
    }

    return {};
  };
});

/**
 * Test if the current user is authenticated.
 */
export const isAuthenticated = computed(() => currentUser.value !== null);
