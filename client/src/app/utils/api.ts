import { AxiosResponse } from 'axios';

/**
 * Test for validation errors
 */
export function isValidationError(err: any): err is { response: AxiosResponse<Record<string, string[]>> } {
  return err?.response?.status === 422;
}
