import { ref } from 'vue'
import { useDark } from '@vueuse/core'

/**
 * Dark mode
 */
export const isDark = useDark()

/**
 * Keyboard configs
 */
export const keyboardConfigs = ref(window.context.keyboardConfigs)

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
