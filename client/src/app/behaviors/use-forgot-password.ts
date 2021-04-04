import { reactive, ref } from 'vue'

/**
 * Reset a user's password
 */
export function useForgotPassword() {
  const data = reactive({
    email: ''
  })

  const loading = ref(false)

  const forgotPassword = () => {
    console.log('resetting it...')
  }

  return {
    data,
    loading,
    forgotPassword,
  }
}
