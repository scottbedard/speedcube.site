import { reactive } from 'vue'

/**
 * Login
 */
export function useLogin() {
  const data = reactive({
    username: '',
    password: '',
  })

  return {
    data
  }
}
