import { ref } from 'vue';
import { UserModel } from '@/app/types/user';
import axios from 'axios';

/**
 * The currently authenticated user
 */
export const currentUser = ref<UserModel | null>(null);

/**
 * Refresh the current user
 */
export function refreshCurrentUser() {
  return axios.get<UserModel>('/api/rainlab/user/account').then(response => {
    currentUser.value = response.data;
  }).catch(() => {
    currentUser.value = null;
  });
}
