import { ForgotPasswordResponse, StatusCodes } from '@/app/types/api'
import { isStatusCode, isValidationError, useFieldErrors } from '@/app/api'
import { reactive, ref } from 'vue'
import axios from 'axios'

/**
 * Start the password reset process
 */
export function useForgotPassword() {
  const { clearFieldErrors, fieldErrors, setFieldErrors } = useFieldErrors();
  const data = reactive({ email: '' })
  const failed = ref(false)
  const invalid = ref(false)
  const loading = ref(false)
  const unauthorized = ref(false)

  const forgotPassword = () => {
    failed.value = false
    invalid.value = false
    loading.value = true
    unauthorized.value = false
  
    clearFieldErrors()

    return new Promise<void>((resolve, reject) => {
      axios.post<ForgotPasswordResponse>('/api/users/forgot-password', data).then(() => {
        // success
        resolve()
      }, (err) => {
        // failed
        failed.value = true

        if (isValidationError(err)) {
          invalid.value = true
          setFieldErrors(err)
        } else if (isStatusCode(err, StatusCodes.Unauthorized)) {
          unauthorized.value = true
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
    forgotPassword,
    invalid,
    loading,
    unauthorized,
  }
}
