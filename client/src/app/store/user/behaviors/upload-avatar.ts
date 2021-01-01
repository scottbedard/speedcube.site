import { currentUser } from '@/app/store/user/state';
import { postAvatar } from '@/app/repositories/user';
import { ref } from 'vue';

/**
 * Upload an avatar photo.
 */
export function useUploadAvatar() {
  const uploadAvatarIsLoading = ref(false);

  const uploadAvatar = (avatar: string | Blob) => {
    uploadAvatarIsLoading.value = true;

    const xhr = postAvatar(avatar);

    xhr.then((response) => {
      currentUser.value = response.data;
    }).finally(() => {
      uploadAvatarIsLoading.value = false;
    });

    return xhr;
  }

  return {
    uploadAvatar,
    uploadAvatarIsLoading,
  };
}
