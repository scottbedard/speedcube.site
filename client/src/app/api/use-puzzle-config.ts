import { cloneDeep } from 'lodash-es'
import { cubeConfig } from '@/components/puzzle/constants'
import { isCube, normalizePuzzleName } from '@/app/utils'
import { ref } from 'vue'

/**
 * The user's puzzle config
 */
export function usePuzzleConfig(rawPuzzleName: string) {
  const config = ref<Record<string, any>>({})
  const failed = ref(false)
  const loading = ref(false)

  const puzzle = normalizePuzzleName(rawPuzzleName)

  if (isCube(puzzle)) {
    config.value = cloneDeep(cubeConfig)
  }

  const save = () => {
    failed.value = false
    loading.value = true

    console.log('saving', config.value)

    return new Promise<void>(resolve => {
      setTimeout(() => {
        loading.value = false

        resolve()
      }, 1000)
    })
  }

  return {
    config,
    failed,
    loading,
    save,
  }
}
