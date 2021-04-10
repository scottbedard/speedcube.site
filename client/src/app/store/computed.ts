import { computed } from 'vue'
import { user } from './state'

/**
 * Test if the user is authenticated.
 */
export const isAuthenticated = computed(() => user.value !== null)
