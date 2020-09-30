import { currentUser } from '@/app/state/current-user';
import { ref } from 'vue';
import { UserModel } from '@/types/user';
import axios from 'axios';

export type LoginData = {
  username: string,
  password: string,
};

/**
 * Authenticate the current user
 */
export function useLogin() {
  const loginData = ref<LoginData>({
    username: '',
    password: '',
  });

  const loginIsLoading = ref(false);

  const login = () => {
    loginIsLoading.value = true;

    const request = axios.post<UserModel>('/api/rainlab/user/auth/login', loginData.value);

    request.then((response) => {
      // success
      currentUser.value = response.data;
    }).finally(() => {
      // complete
      loginIsLoading.value = false;
    });

    return request;
  };

  return {
    login,
    loginData,
    loginIsLoading,
  };
}
