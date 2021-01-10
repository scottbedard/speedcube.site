/**
 * Api response
 */
export type ApiResponse<T extends Record<string, any>> = {
  status: 'success',
} & T;

/**
 * Validation error
 */
export type ValidationError<Data = Record<string, unknown>> = {
  [T in keyof Data]?: string[]
};
