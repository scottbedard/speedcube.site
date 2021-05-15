import {
  AxiosErrorResponse,
  AxiosValidationErrorResponse,
  StatusCodes,
} from '@/app/types/api'

import { reactive } from 'vue'

/**
 * Test for an error with a status code
 */
export function isStatusCode(err: any, statusCode: StatusCodes): err is AxiosErrorResponse {
  return err?.response?.status === statusCode
}

/**
 * Test if an error is a validation error
 */
export function isValidationError(err: any): err is AxiosValidationErrorResponse {
  return isStatusCode(err, StatusCodes.UnprocessableEntity)
}

/**
 * Create a reactive errors object for form data
 */
export function useFieldErrors() {
  const fieldErrors = reactive<Record<string, string[]>>({});

  const clearFieldErrors = () => {
    Object.keys(fieldErrors).forEach(key => {
      delete fieldErrors[key]
    })
  }

  const setFieldErrors = (err: AxiosValidationErrorResponse) => {
    Object.assign(fieldErrors, err.response.data.errors);
  }

  return {
    clearFieldErrors,
    fieldErrors,
    setFieldErrors,
  }
}