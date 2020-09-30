import { Context } from '@/types/context';
import { currentUser } from './state/current-user';

/**
 * Initialize the application
 */
export function boot(context: Context) {
  if (context.user) {
    currentUser.value = context.user;
  }
}
