import axios from 'axios';
import { UserModel } from '@/types/models/user';
import { currentUser } from '@/app/store/user/state';

export type CreateConfigPayload = {
  data: Record<string, any>,
  puzzleId: number,
};

/**
 * Create a config for the current user.
 */
export function createConfig(payload: CreateConfigPayload) {
  return axios.post('/api/speedcube/speedcube/configs', payload)
    .then(refreshCurrentUser);
}

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