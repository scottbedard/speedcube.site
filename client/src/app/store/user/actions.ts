import { currentUser } from '@/app/store/user/state';
import { KeyboardConfig } from '@/types/puzzle';
import { UserModel } from '@/types/models/user';
import axios from 'axios';

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

/**
 * Save a keyboard config.
 */
export function saveKeyboardConfig(puzzleId: number, data: KeyboardConfig) {
  const json = JSON.stringify(data);

  return axios.post('/api/speedcube/speedcube/keyboardconfigs', { puzzleId, data: json })
    .then(refreshCurrentUser)
}