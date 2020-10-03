import { currentUser } from '@/app/store/user/state';
import { isValidationError } from '@/app/utils/api';
import { ref } from 'vue';
import { UserModel } from '@/types/user';
import { ValidationError } from '@/types/api';
import axios from 'axios';

export type LoginData = {
  username: string,
  password: string,
};

/**
 * Authenticate the current user.
 */
export function useLogin() {
  const loginData = ref<LoginData>({
    username: '',
    password: '',
  });

  const loginFailed = ref(false);
  const loginIsLoading = ref(false);
  const loginValidationErrors = ref<ValidationError<LoginData>>({});

  const login = () => {
    loginFailed.value = false;
    loginIsLoading.value = true;

    return axios.post<UserModel>('/api/rainlab/user/auth/login', loginData.value)
      .then((response) => {
        // success
        currentUser.value = response.data;
      })
      .catch((err) => {
        // failed
        if (isValidationError<LoginData>(err)) {
          loginValidationErrors.value = err.response.data;
        }

        loginFailed.value = true;
      })
      .finally(() => {
        // complete
        loginIsLoading.value = false;
      });
  };

  return {
    login,
    loginData,
    loginFailed,
    loginIsLoading,
    loginValidationErrors,
  };
}
