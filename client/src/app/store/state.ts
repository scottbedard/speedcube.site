import { computed, ref } from 'vue'
import { useDark } from '@vueuse/core'
import { KeyboardConfig } from '@/app/types/models'

/**
 * Dark mode
 */
export const isDark = useDark()

/**
 * Keyboard configs
 */
const _keyboardConfigs = ref(window.context.keyboardConfigs)

export const keyboardConfigs = computed<KeyboardConfig[]>({
  // laravel casts empty objects to an array. rather than solve this with
  // complicated model serialization logic, we'll just apply a getter on
  // the client side to revert the associative arrays to an empty object.
  get: () => _keyboardConfigs.value.map(obj => ({
    config: {
      default: Array.isArray(obj.config.default) ? {} : obj.config.default,
      keyspaces: Array.isArray(obj.config.keyspaces) ? {} : obj.config.keyspaces,
    },
    puzzle: obj.puzzle,
  })),
  set: (keyboardConfigs: KeyboardConfig[]) => {
    _keyboardConfigs.value = keyboardConfigs
  }
})

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
