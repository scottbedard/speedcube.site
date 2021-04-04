import { LoginResponse } from '@/app/types/api'
import { ref, reactive } from 'vue'
import { state } from '@/app/store/state'
import axios from 'axios'

/**
 * Login
 */
export function useLogin() {
  const data = reactive({
    password: '',
    remember: false,
    username: '',
  })

  const loading = ref(false)

  const login = () => {
    loading.value = true;

    return axios.post<LoginResponse>('/api/auth/login', data).then(response => {
      // success
      state.user = response.data.user
    }).finally(() => {
      // complete
      loading.value = false
    })
  }

  return {
    data,
    loading,
    login
  }
}
