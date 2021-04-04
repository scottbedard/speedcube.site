import { reactive, ref } from 'vue'

/**
 * Reset a user's password
 */
export function useResetPassword() {
  const data = reactive({
    email: ''
  })

  const loading = ref(false)

  const resetPassword = () => {
    console.log('resetting it...')
  }

  return {
    data,
    loading,
    resetPassword
  }
}
