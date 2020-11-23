import { UserModel } from './models/user';

/**
 * Application context
 */
export type Context = {
  user: UserModel | null,
};
