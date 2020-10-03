import { ref } from 'vue';
import { UserModel } from '@/types/user';

/**
 * State for the current user.
 */
export const currentUser = ref<null | UserModel>(null);

/**
 * Reset user state
 */
export const resetUserState = () => {
  currentUser.value = null;
}
