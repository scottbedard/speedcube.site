import { arrayToObject } from '@/app/utils'
import { computed, unref } from 'vue'
import { defaultKeyboardConfig, defaultPuzzleConfig, isCube, normalizePuzzleName } from '@/app/utils'
import { KeyboardConfig, PuzzleConfig } from '@/app/types/models'
import { MaybeRef } from '@vueuse/core'
import { rawKeyboardConfigs, previewKeyboardConfig, rawPuzzleConfigs, user, previewPuzzleConfig } from './state'

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
export const keyboardConfig = computed(() => {
  return (rawPuzzleName: MaybeRef<string>) => {
    // preview keyboard config
    if (previewKeyboardConfig.value) {
      return previewKeyboardConfig.value
    }

    // user's keyboard config for puzzle
    const puzzle = normalizePuzzleName(unref(rawPuzzleName))

    const model = keyboardConfigs.value.find(obj => obj.puzzle === puzzle)

    if (model) {
      return model.config
    }

    // default keyboard config for puzzle
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
  return (rawPuzzleName: MaybeRef<string>) => {
    // preview puzzle config
    if (previewPuzzleConfig.value) {
      return previewPuzzleConfig.value
    }

    // user's puzzle config for puzzle
    const puzzleName = normalizePuzzleName(unref(rawPuzzleName))

    const model = puzzleConfigs.value.find(obj => obj.puzzle === puzzleName)

    if (model) {
      return model.config
    }

    // default puzzle config or puzzle
    return defaultPuzzleConfig(puzzleName)
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