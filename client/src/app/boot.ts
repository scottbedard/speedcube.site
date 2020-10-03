import { Context } from '@/types/context';
import { currentUser } from '@/app/store/user/state';

/**
 * Initialize the application
 */
export function boot(context: Context) {
  if (context.user) {
    currentUser.value = context.user;
  }
}
