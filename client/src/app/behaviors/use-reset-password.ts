import { reactive, ref } from 'vue'

/**
 * Reset a user's password
 */
export function useResetPassword() {
  const data = reactive({
    password: '',
    passwordConfirmation: '',
  })

  const loading = ref(false)

  const resetPassword = () => {
    console.log('resetPassword')
  }

  return {
    data,
    loading,
    resetPassword,
  }
}
