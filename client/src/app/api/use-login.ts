import { isErrorWithCode, isValidationError, useErrors } from '@/app/api'
import { LoginResponse } from '@/app/types/api'
import { ref, reactive } from 'vue'
import { state } from '@/app/store/state'
import axios from 'axios'

/**
 * Login
 */
export function useLogin() {
  const { clearErrors, errors, setErrors } = useErrors();

  const data = reactive({
    password: '',
    remember: false,
    username: '',
  })

  const failed = ref(false)
  const loading = ref(false)
  const unauthorized = ref(false)

  const login = () => {
    clearErrors()
    failed.value = false
    loading.value = true
    unauthorized.value = false

    return new Promise<void>((resolve, reject) => {
      axios.post<LoginResponse>('/api/auth/login', data).then(response => {
        // success
        state.user = response.data.user

        resolve()
      }, (err) => {
        // failed
        failed.value = true

        if (isValidationError(err)) {
          setErrors(err)
        } else if (isErrorWithCode(err, 401)) {
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
    errors,
    failed,
    loading,
    login,
    unauthorized,
  }
}
