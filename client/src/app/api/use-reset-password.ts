import { reactive, ref } from 'vue'

/**
 * Reset a user's password
 */
export function useResetPassword() {
  const data = reactive({
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const loading = ref(false)

  const resetPassword = (token: string) => {
    console.log('resetPassword', token)
  }

  return {
    data,
    loading,
    resetPassword,
  }
}
