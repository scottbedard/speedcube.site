import { UserModel } from '@/types/models/user';
import axios from 'axios';

/**
 * Delete a user's profile photo.
 */
export function deleteAvatar() {
  return axios.delete<UserModel>('/api/rainlab/user/account/avatar');
}

/**
 * Upload a profile photo.
 */
export function postAvatar(avatar: string | Blob) {
  const data = new FormData();

  data.append('avatar', avatar);

  return axios.post<UserModel>('/api/rainlab/user/account', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

/**
 * Authenticate a user.
 */
export function postLogin(payload: {
  username: string,
  password: string,
  remember: boolean,
}) {
  return axios.post<UserModel>('/api/rainlab/user/auth/login', payload);
}

/**
 * Update a user.
 */
export function postUser(payload: {
  email?: string,
  name?: string,
  password?: string,
  passwordConfirmation?: string,
}) {
  return axios.post<UserModel>('/api/rainlab/user/account', payload);
}