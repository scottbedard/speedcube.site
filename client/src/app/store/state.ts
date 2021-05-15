import { arrayToObject } from '@/app/utils'
import { computed, ref } from 'vue'
import { KeyboardConfig } from '@/app/types/models'
import { useDark } from '@vueuse/core'

/**
 * Dark mode
 */
export const isDark = useDark()

/**
 * Keyboard config models
 */
const rawKeyboardConfigs = ref(window.context.keyboardConfigs)

export const keyboardConfigs = computed<KeyboardConfig[]>({
  get: () => rawKeyboardConfigs.value.map(obj => {
    return {
      config: arrayToObject(obj.config),
      puzzle: obj.puzzle,
    }
  }),
  set: (value) => {
    rawKeyboardConfigs.value = value
  }
})

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
export const puzzleConfigs = ref(window.context.puzzleConfigs)

/**
 * User
 */
export const user = ref(window.context.user)
