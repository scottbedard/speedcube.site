import { computed } from 'vue'
import { state } from './state'

/**
 * Test if the user is authenticated.
 */
export const isAuthenticated = computed(() => state.user !== null)
