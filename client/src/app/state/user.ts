import { UserModel } from '@/app/types/user';
import { computed, ref } from 'vue';

/**
 * The currently authenticated user
 */
export const currentUser = ref<UserModel | null>(null);
