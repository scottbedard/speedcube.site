import { computed } from 'vue';
import { currentUser } from '@/app/store/user/state';

/**
 * Test if the current user is authenticated.
 */
export const isAuthenticated = computed(() => currentUser.value !== null);
