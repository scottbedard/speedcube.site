import { cloneDeep } from 'lodash-es'
import { isCube, normalizePuzzleName } from '@/app/utils'
import { previewPuzzleConfig, puzzleConfigs } from '@/app/store/state'
import { puzzleConfig } from '@/app/store/computed'
import { ref, onUnmounted, watch } from 'vue'
import { UpdatePuzzleConfigResponse } from '@/app/types/api'
import axios from 'axios'

/**
 * The user's puzzle config
 */
export function usePuzzleConfig(rawPuzzleName: string) {
  const config = ref<Record<string, unknown>>({})
  const failed = ref(false)
  const loading = ref(false)

  const puzzle = normalizePuzzleName(rawPuzzleName)

  if (isCube(puzzle)) {
    config.value = cloneDeep(puzzleConfig.value(puzzle))
  }

  const save = () => {
    failed.value = false
    loading.value = true

    return new Promise<void>((resolve, reject) => {
      axios.post<UpdatePuzzleConfigResponse>('/api/puzzle-configs', {
        config: config.value,
        puzzle,
      }).then(response => {
        // success
        puzzleConfigs.value = response.data.puzzleConfigs

        resolve()
      }, () => {
        // failed
        failed.value = true

        reject()
      }).finally(() => {
        // complete
        loading.value = false
      })
    })
  }

  onUnmounted(() => {
    previewPuzzleConfig.value = null
  })

  watch(config, () => {
    previewPuzzleConfig.value = config.value
  }, { deep: true })

  return {
    config,
    failed,
    loading,
    save,
  }
}
