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
  const createUserIsLoading = ref(false);

  const createUser = (data: CreateUserData) => {
    const payload = snakeCaseKeysDeep(data);

    createUserIsLoading.value = true;

    return axios.post('/api/rainlab/user/users', payload).then(response => {
      // success
      console.log('success', response.data);
    }).catch(err => {
      // failed
      console.log('failed', err.response);
    }).finally(() => {
      // complete
      createUserIsLoading.value = false;
    });
  };

  return {
    createUser,
    createUserIsLoading,
  };
}