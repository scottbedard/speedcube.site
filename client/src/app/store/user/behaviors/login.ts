/* eslint-disable */
import { currentUser } from '@/app/store/user/state';
import { isValidationError } from '@/app/utils/api';
import { ref } from 'vue';
import { UserModel } from '@/types/models/user';
import { ValidationError } from '@/types/api';
import axios from 'axios';

export type LoginData = {
  password: string,
  remember: boolean,
  username: string,
};

/**
 * Authenticate the current user.
 */
export function useLogin() {
  const loginData = ref<LoginData>({
    password: '',
    remember: false,
    username: '',
  });

  const loginFailed = ref(false);
  const loginIsLoading = ref(false);
  const loginValidationErrors = ref<ValidationError<LoginData>>({});

  const login = async () => {
    loginFailed.value = false;
    loginIsLoading.value = true;

    try {
      const { data } = await axios.post<UserModel>('/api/rainlab/user/auth/login', loginData.value);
      
      currentUser.value = data;
    } catch (err) {
      if (isValidationError<LoginData>(err)) {
        loginValidationErrors.value = err.response.data;
      }

      loginFailed.value = true;
    }
  };

  return {
    login,
    loginData,
    loginFailed,
    loginIsLoading,
    loginValidationErrors,
  };
}
