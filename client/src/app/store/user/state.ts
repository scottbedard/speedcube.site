import { ref } from 'vue';
import { UserModel } from '@/types/user';

/**
 * State for the current user.
 */
export const currentUser = ref<null | UserModel>(null);