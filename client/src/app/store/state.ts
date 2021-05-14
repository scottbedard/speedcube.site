import { arrayToObject } from '@/app/utils'
import { computed, ref } from 'vue'
import { KeyboardConfig as KeyboardConfigModel } from '@/app/types/models'
import { KeyboardConfig } from '@/app/types/puzzle'
import { useDark } from '@vueuse/core'

/**
 * Dark mode
 */
export const isDark = useDark()

/**
 * Keyboard config models
 */
const rawKeyboardConfigs = ref(window.context.keyboardConfigs)

export const keyboardConfigs = computed<KeyboardConfigModel[]>({
  get: () => rawKeyboardConfigs.value.map(obj => ({
    config: {
      default: arrayToObject(obj.config.default),
      keyspaces: arrayToObject(obj.config.keyspaces),
    },
    puzzle: obj.puzzle,
  })),
  set: (keyboardConfigs: KeyboardConfigModel[]) => {
    rawKeyboardConfigs.value = keyboardConfigs
  }
})

/**
 * Preview keyboard config
 */
export const previewKeyboardConfig = ref<KeyboardConfig | null>(null)

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
