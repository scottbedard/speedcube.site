import { isStatusCode, isValidationError, useFieldErrors } from '@/app/api'
import { reactive, ref } from 'vue'
import { StatusCodes, UpdateUserResponse } from '@/app/types/api'
import { user } from '@/app/store/state'
import axios from 'axios'

/**
 * Update the authenticated user.
 */
export function useUpdateUser<T extends Record<string, any>>(fields: T) {
  const { clearFieldErrors, fieldErrors, setFieldErrors } = useFieldErrors()

  const data = reactive<T>(fields)

  const failed = ref(false)
  const invalid = ref(false)
  const loading = ref(false)
  const unauthorized = ref(false)

  const updateUser = () => new Promise<void>((resolve, reject) => {
    failed.value = false
    invalid.value = false
    loading.value = true
    unauthorized.value = false
    clearFieldErrors()

    axios.post<UpdateUserResponse>(`/api/users/${user.value?.id}`, data).then(response => {
      // success
      user.value = response.data.user

      resolve()
    }, err => {
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

  return {
    data,
    failed,
    fieldErrors,
    invalid,
    loading,
    unauthorized,
    updateUser,
  }
}