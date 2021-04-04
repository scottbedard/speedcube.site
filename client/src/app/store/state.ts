import { reactive } from 'vue'

/**
 * Global application state
 */
export const state = reactive({
  user: window.context.user
})
