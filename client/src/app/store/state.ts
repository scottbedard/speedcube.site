import { ref } from 'vue'
import { useDark } from '@vueuse/core'

/**
 * Dark mode
 */
export const isDark = useDark()

/**
 * Raw keyboard config models
 */
export const rawKeyboardConfigs = ref(window.context.keyboardConfigs)

/**
 * Preview keyboard config
 */
export const previewKeyboardConfig = ref<Record<string, string> | null>(null)

/**
 * Preview puzzle config
 */
export const previewPuzzleConfig = ref<Record<string, unknown> | null>(null)

/**
 * Puzzle configs
 */
export const rawPuzzleConfigs = ref(window.context.puzzleConfigs)

/**
 * User
 */
export const user = ref(window.context.user)
