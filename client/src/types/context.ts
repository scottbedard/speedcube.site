import { UserModel } from './user';

/**
 * Application context
 */
export type Context = {
  user: UserModel | null,
};
