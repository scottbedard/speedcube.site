import { cloneDeep } from 'lodash-es'
import { computed } from 'vue'
import { cubeConfig } from '@/components/puzzle/constants'
import { isCube } from '@/app/utils'
import { puzzleConfigs, user } from './state'
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