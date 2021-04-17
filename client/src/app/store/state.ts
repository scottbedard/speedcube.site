import { ref } from 'vue'
import { useDark } from '@vueuse/core'

/**
 * Dark mode
 */
export const isDark = useDark()

/**
 * User
 */
export const user = ref(window.context.user)
