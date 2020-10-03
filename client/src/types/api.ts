/**
 * Validation error
 */
export type ValidationError<Data = Record<string, unknown>> = {
  [T in keyof Data]?: string[]
};
