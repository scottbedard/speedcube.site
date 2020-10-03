import { AxiosResponse } from 'axios';
import { ValidationError } from '@/types/api';

/**
 * Test for validation errors
 */
export function isValidationError<T>(err: any): err is {
  response: AxiosResponse<ValidationError<T>>,
  status: 422,
} {
  return err?.response?.status === 422;
}
