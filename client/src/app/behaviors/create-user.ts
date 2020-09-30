import { isValidationError } from '@/app/utils/api';
import { ref } from 'vue';
import { refreshCurrentUser } from '@/app/state/current-user';
import { UserModel } from '@/types/user';
import axios from 'axios';

export type CreateUserData = {
  email: string,
  password: string,
  passwordConfirmation: string,
  username: string,
};

/**
 * Create user.
 */
export function useCreateUser() {
  const createUserErrors = ref({});
  const createUserFailed = ref(true);
  const createUserIsLoading = ref(false);

  const createUser = (data: CreateUserData) => {
    createUserErrors.value = {};
    createUserFailed.value = false;
    createUserIsLoading.value = true;

    const request = axios.post<UserModel>('/api/rainlab/user/users', data);

    request.catch(err => {
      // failed
      if (isValidationError(err)) {
        createUserErrors.value = err.response.data;
      }
      
      createUserFailed.value = true;
    }).finally(() => {
      // complete
      createUserIsLoading.value = false;
    });

    return request.then(refreshCurrentUser);
  };

  return {
    createUser,
    createUserErrors,
    createUserFailed,
    createUserIsLoading,
  };
}