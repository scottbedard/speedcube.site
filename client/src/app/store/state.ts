import { ref } from 'vue'
import { useDark } from '@vueuse/core'

/**
 * Dark mode
 */
export const isDark = useDark()

/**
 * Puzzle configs
 */
export const puzzleConfigs = ref([])

/**
 * User
 */
export const user = ref(window.context.user)
