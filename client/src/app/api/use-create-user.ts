import { CreateUserResponse } from '@/app/types/api'
import { isValidationError, useFieldErrors } from '@/app/api'
import { reactive, ref } from 'vue'
import { user } from '@/app/store/state'
import axios from 'axios'

/**
 * Create an account
 */
export function useCreateUser() {
  const { clearFieldErrors, fieldErrors, setFieldErrors } = useFieldErrors();

  const data = reactive({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const loading = ref(false)
  const failed = ref(false)

  const createUser = () => {
    clearFieldErrors()
    loading.value = true
    failed.value = false

    return new Promise<void>((resolve, reject) => {
      axios.post<CreateUserResponse>('/api/users', data).then((response) => {
        // success
        user.value = response.data.user
        resolve()
      }, (err: number) => {
        // failed
        failed.value = true

        if (isValidationError(err)) {
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
    createUser,
    data,
    failed,
    fieldErrors,
    loading,
  }
}
