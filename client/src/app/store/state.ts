import { reactive } from 'vue'
import { User } from '@/app/types/models'

/**
 * Application state
 */
export const state = reactive({
  user: null as null | User,
})
