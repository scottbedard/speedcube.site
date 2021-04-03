import { reactive } from 'vue'

/**
 * Login
 */
export function useLogin() {
  const data = reactive({
    password: '',
    remember: false,
    username: '',
  })

  return {
    data
  }
}
