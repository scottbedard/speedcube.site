import { currentUser } from '../state';
import { isValidationError } from '@/app/utils/api';
import { postUser } from '@/app/repositories/user';
import { ref } from 'vue';
import { ValidationError } from '@/types/api';

export type UpdateUserData = {
  email: string,
  name: string,
};

/**
 * Update an existing user.
 */
export function useUpdateUser() {
  const updateUserData = ref<UpdateUserData>({
    email: currentUser.value?.email ?? '',
    name: currentUser.value?.name ?? '',
  });

  const updateUserFailed = ref(false);
  const updateUserIsLoading = ref(false);
  const updateUserValidationErrors = ref<ValidationError<UpdateUserData>>({});

  const updateUser = () => {
    updateUserFailed.value = false;
    updateUserIsLoading.value = true;

    const xhr = postUser(updateUserData.value)
    
    xhr.then((response) => {
      // success
      currentUser.value = response.data;
      updateUserValidationErrors.value = {};
    }).catch((err) => {
      // failed
      if (isValidationError<UpdateUserData>(err)) {
        updateUserValidationErrors.value = err.response.data;
      }

      updateUserFailed.value = true;
    }).finally(() => {
      // complete
      updateUserIsLoading.value = false;
    });

    return xhr;
  }

  return {
    updateUser,
    updateUserData,
    updateUserFailed,
    updateUserIsLoading,
    updateUserValidationErrors,
  };
}
