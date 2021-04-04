import { reactive } from 'vue'
import { User } from '@/app/types/models'

/**
 * Global application state
 */
export const state = reactive<{ user: User | null }>({
  user: window.context.user
})
