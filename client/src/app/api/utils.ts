import { AxiosErrorResponse, AxiosValidationErrorResponse } from '@/app/types/api'
import { reactive } from 'vue'

/**
 * Test for an error with a status code
 */
export function isErrorWithCode(err: any, statusCode: number): err is AxiosErrorResponse {
  return err?.response?.status === statusCode
}

/**
 * Test if an error is a validation error
 */
export function isValidationError(err: any): err is AxiosValidationErrorResponse {
  return isErrorWithCode(err, 422)
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