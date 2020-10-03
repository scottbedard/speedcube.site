import axios from 'axios';
import { UserModel } from '@/types/user';
import { currentUser } from '@/app/store/user/state';

/**
 * Log out the current user.
 */
export function logoutCurrentUser() {
  return axios.get('/api/rainlab/user/auth/logout').then(() => {
    currentUser.value = null;
  });
}

/**
 * Refresh the current user.
 */
export function refreshCurrentUser() {
  return axios.get<UserModel>('/api/rainlab/user/account').then(response => {
    currentUser.value = response.data;
  });
}