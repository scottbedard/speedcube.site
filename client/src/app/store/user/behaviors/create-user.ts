import { currentUser } from '@/app/store/user/state';
import { isValidationError } from '@/app/utils/api';
import { ref } from 'vue';
import { UserModel } from '@/types/user';
import { ValidationError } from '@/types/api';
import axios from 'axios';

export type CreateUserData = {
  email: string,
  password: string,
  passwordConfirmation: string,
  username: string,
};

/**
 * Create a new user.
 */
export function useCreateUser() {
  const createUserData = ref<CreateUserData>({
    email: '',
    password: '',
    passwordConfirmation: '',
    username: '',
  });

  const createUserFailed = ref(false);
  const createUserIsLoading = ref(false);
  const createUserValidationErrors = ref<ValidationError<CreateUserData>>({});

  const createUser = () => {
    createUserFailed.value = false;
    createUserIsLoading.value = true;

    return axios.post<UserModel>('/api/rainlab/user/users', createUserData.value)
      .then((response) => {
        // success
        currentUser.value = response.data;
      })
      .catch((err) => {
        // failed
        if (isValidationError<CreateUserData>(err)) {
          createUserValidationErrors.value = err.response.data;
        }

        createUserFailed.value = true;
      })
      .finally(() => {
        // complete
        createUserIsLoading.value = false;
      });
  }
  
  return {
    createUser,
    createUserData,
    createUserFailed,
    createUserIsLoading,
    createUserValidationErrors,
  };
}
