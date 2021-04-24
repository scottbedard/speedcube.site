import { ref } from 'vue'
import { useDark } from '@vueuse/core'

/**
 * Dark mode
 */
export const isDark = useDark()

/**
 * Puzzle configs
 */
export const puzzleConfigs = ref(window.context.puzzleConfigs)

/**
 * Preview puzzle config
 */
export const previewPuzzleConfig = ref<Record<string, unknown> | null>(null)

/**
 * User
 */
export const user = ref(window.context.user)
