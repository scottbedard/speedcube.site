import { currentUser } from '@/app/store/user/state';
import { deleteAvatar as deleteAvatarXhr } from '@/app/repositories/user';
import { ref } from 'vue';

/**
 * Delete avatar photo.
 */
export function useDeleteAvatar() {
  const deleteAvatarIsLoading = ref(false);

  const deleteAvatar = () => {
    deleteAvatarIsLoading.value = true;

    const xhr = deleteAvatarXhr();

    xhr.then((response) => {
      currentUser.value = response.data;
    }).finally(() => {
      deleteAvatarIsLoading.value = false;
    });

    return xhr;
  }

  return {
    deleteAvatar,
    deleteAvatarIsLoading,
  };
}
