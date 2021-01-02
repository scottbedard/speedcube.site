import { currentUser } from '@/app/store/user/state';
import { isValidationError } from '@/app/utils/api';
import { postLogin } from '@/app/repositories/user';
import { ref } from 'vue';
import { ValidationError } from '@/types/api';

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

  const login = () => {
    loginFailed.value = false;
    loginIsLoading.value = true;

    const xhr = postLogin(loginData.value);

    xhr.then((response) => {
      // success
      currentUser.value = response.data;
    }).catch((err) => {
      // failed
      if (isValidationError<LoginData>(err)) {
        loginValidationErrors.value = err.response.data;
      }

      loginFailed.value = true;
    }).finally(() => {
      // complete
      loginIsLoading.value = false;
    });

    return xhr;
  };

  return {
    login,
    loginData,
    loginFailed,
    loginIsLoading,
    loginValidationErrors,
  };
}
