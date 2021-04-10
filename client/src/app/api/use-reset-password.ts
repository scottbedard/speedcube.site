import { reactive, ref } from 'vue'
import { isValidationError, useFieldErrors } from '@/app/api'
import axios from 'axios'

/**
 * Reset a user's password
 */
export function useResetPassword() {
  const { clearFieldErrors, fieldErrors, setFieldErrors } = useFieldErrors();

  const data = reactive({
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const failed = ref(false)
  const invalid = ref(false)
  const loading = ref(false)

  const resetPassword = (token: string) => {
    failed.value = false
    invalid.value = false
    loading.value = true
    clearFieldErrors()

    return new Promise<void>((resolve, reject) => {
      axios.post('/api/users/reset-password', { ...data, token }).then(() => {
        // success
        resolve()
      }, err => {
        // failed
        failed.value = true

        if (isValidationError(err)) {
          invalid.value = true
          setFieldErrors(err)
        }

        reject()
      }).finally(() => {
        // complete
        loading.value = false
      })
    })
  }

  return {
    data,
    failed,
    fieldErrors,
    invalid,
    loading,
    resetPassword,
  }
}
