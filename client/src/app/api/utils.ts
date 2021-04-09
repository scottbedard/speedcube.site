import { AxiosValidationErrorResponse } from '@/app/types/api'
import { reactive } from 'vue'

/**
 * Test if an error is a validation error
 */
export function isValidationError<T>(err: any): err is AxiosValidationErrorResponse {
  return err?.response?.status === 422
}

/**
 * Create a reactive errors object for form data
 */
export function useErrors() {
  const errors = reactive<Record<string, string[]>>({});

  const clearErrors = () => {
    Object.keys(errors).forEach(key => {
      delete errors[key]
    })
  }

  const setErrors = (err: AxiosValidationErrorResponse) => {
    Object.assign(errors, err.response.data.errors);
  }

  return {
    clearErrors,
    errors,
    setErrors,
  }
}