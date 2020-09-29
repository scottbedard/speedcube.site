import { isValidationError } from '@/app/utils/api';
import { ref } from 'vue';
import { snakeCaseKeysDeep } from '@/app/utils/object';
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
    const payload = snakeCaseKeysDeep(data);

    createUserErrors.value = {};
    createUserFailed.value = false;
    createUserIsLoading.value = true;

    return axios.post('/api/rainlab/user/users', payload).then(response => {
      // success
      console.log('success', response.data);
    }).catch(err => {
      // failed
      if (isValidationError(err)) {
        createUserErrors.value = err.response.data;
      }
      
      createUserFailed.value = true;
    }).finally(() => {
      // complete
      createUserIsLoading.value = false;
    });
  };

  return {
    createUser,
    createUserErrors,
    createUserFailed,
    createUserIsLoading,
  };
}