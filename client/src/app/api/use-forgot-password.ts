import { reactive, ref } from 'vue'

/**
 * Start the password reset process
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
