import { arrayToObject } from '@/app/utils'
import { cloneDeep } from 'lodash-es'
import { computed } from 'vue'
import { cubeConfig } from '@/components/puzzle/constants'
import { defaultKeyboardConfig, isCube, normalizePuzzleName } from '@/app/utils'
import { KeyboardConfig, PuzzleConfig } from '@/app/types/models'
import { rawKeyboardConfigs, previewKeyboardConfig, rawPuzzleConfigs, user } from './state'

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
export const keyboardConfig = computed<(rawPuzzleName: string) => Record<string, string>>(() => {
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
    return defaultKeyboardConfig(puzzle)
  }
})

/**
 * Keyboard config models
 */
 export const keyboardConfigs = computed<KeyboardConfig[]>(() => {
  return rawKeyboardConfigs.value.map(obj => {
    return {
      config: arrayToObject(JSON.parse(obj.config)),
      puzzle: obj.puzzle,
    }
  })
})

/**
 * Config for a particular puzzle.
 */
export const puzzleConfig = computed(() => {
  return (puzzle: string) => {
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

/**
 * Puzzle config models
 */
export const puzzleConfigs = computed<PuzzleConfig[]>(() => {
  return rawPuzzleConfigs.value.map(obj => {
    return {
      config: JSON.parse(obj.config) as Record<string, unknown>,
      puzzle: obj.puzzle,
    }
  })
})