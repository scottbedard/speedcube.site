import { isStatusCode, isValidationError, useFieldErrors } from '@/app/api'
import { LoginResponse, StatusCodes } from '@/app/types/api'
import { ref, reactive } from 'vue'
import { user } from '@/app/store/state'
import axios from 'axios'

/**
 * Login
 */
export function useLogin() {
  const { clearFieldErrors, fieldErrors, setFieldErrors } = useFieldErrors();

  const data = reactive({
    password: '',
    remember: false,
    username: '',
  })

  const failed = ref(false)
  const loading = ref(false)
  const unauthorized = ref(false)

  const login = () => {
    clearFieldErrors()
    failed.value = false
    loading.value = true
    unauthorized.value = false

    return new Promise<void>((resolve, reject) => {
      axios.post<LoginResponse>('/api/auth/login', data).then(response => {
        // success
        user.value = response.data.user

        resolve()
      }, (err) => {
        // failed
        failed.value = true

        if (isValidationError(err)) {
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
    loading,
    login,
    unauthorized,
  }
}
