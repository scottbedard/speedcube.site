import { CreateUserResponse } from '@/app/types/api'
import { isValidationError, useErrors } from '@/app/api'
import { reactive, ref } from 'vue'
import { state } from '@/app/store/state'
import axios from 'axios'

/**
 * Create an account
 */
export function useCreateUser() {
  const { clearErrors, errors, setErrors } = useErrors();

  const data = reactive({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const loading = ref(false)

  const createUser = () => {
    loading.value = true

    return new Promise<void>((resolve, reject) => {
      clearErrors()

      axios.post<CreateUserResponse>('/api/users', data).then((response) => {
        // success
        state.user = response.data.user
        resolve()
      }, (err: number) => {
        if (isValidationError(err)) {
          setErrors(err)
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
    errors,
    loading,
  }
}
