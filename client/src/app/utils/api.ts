import { AxiosResponse } from 'axios';
import { ValidationError } from '@/types/api';

/**
 * Too many requests
 */
export function isThrottledError<T>(err: any): err is {
  response: AxiosResponse<unknown>,
  status: 429,
} {
  return err?.response?.status === 429;
}

/**
 * Test for validation errors
 */
export function isValidationError<T>(err: any): err is {
  response: AxiosResponse<ValidationError<T>>,
  status: 422,
} {
  return err?.response?.status === 422;
}
