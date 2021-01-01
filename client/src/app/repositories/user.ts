import axios from 'axios';

/**
 * Delete a user's profile photo.
 */
export function deleteAvatar() {
  return axios.delete('/api/rainlab/user/account/avatar');
}

/**
 * Upload a profile photo.
 */
export function postAvatar(avatar: string | Blob) {
  const data = new FormData();

  data.append('avatar', avatar);

  return axios.post('/api/rainlab/user/account', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
