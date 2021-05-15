import { cloneDeep } from 'lodash-es'
import { computed } from 'vue'
import { cubeConfig, cubeKeyboardConfig } from '@/components/puzzle/constants'
import { isCube, normalizePuzzleName } from '@/app/utils'
import { keyboardConfigs, previewKeyboardConfig, puzzleConfigs, user } from './state'
import { PuzzleName } from '@/app/types/puzzle'

/**
 * Test if the user is authenticated.
 */
export const isAuthenticated = computed(() => user.value !== null)

/**
 * Test if the user is a guest.
 */
export const isGuest = computed(() => !isAuthenticated.value)

/**
 * Keyboard config for a particular puzzle.
 */
export const keyboardConfig = computed<(rawPuzzleName: string) => KeyboardConfig>(() => {
  return (rawPuzzleName: string) => {
    // preview keyboard config
    if (previewKeyboardConfig.value) {
      return previewKeyboardConfig.value
    }

    // user config for puzzle
    const puzzle = normalizePuzzleName(rawPuzzleName)

    const model = keyboardConfigs.value.find(obj => obj.puzzle === puzzle)

    if (model) {
      return model.config
    }

    // default config for puzzle
    if (isCube(puzzle)) {
      return cloneDeep(cubeKeyboardConfig)
    }

    // empty config
    return {}
  }
})

/**
 * Config for a particular puzzle.
 */
export const puzzleConfig = computed(() => {
  return (puzzle: PuzzleName) => {
    const model = puzzleConfigs.value.find(obj => obj.puzzle === puzzle)

    if (model) {
      return model.config
    }

    if (isCube(puzzle)) {
      return cloneDeep(cubeConfig)
    }

    return {}
  }
})