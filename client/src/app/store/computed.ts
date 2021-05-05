import { cloneDeep } from 'lodash-es'
import { computed } from 'vue'
import { cubeConfig, cubeKeyboardConfig } from '@/components/puzzle/constants'
import { isCube } from '@/app/utils'
import { keyboardConfigs, puzzleConfigs, user } from './state'
import { KeyboardConfig, PuzzleName } from '@/app/types/puzzle'

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
export const keyboardConfig = computed<(puzzle: PuzzleName) => KeyboardConfig>(() => {
  return (puzzle: PuzzleName) => {
    const model = keyboardConfigs.value.find(obj => obj.puzzle === puzzle)

    if (model) {
      return model.config
    }

    if (isCube(puzzle)) {
      return cloneDeep(cubeKeyboardConfig)
    }

    return {
      default: {},
      keyspaces: {},
    }
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