import { normalizePuzzleName } from '@/app/utils'
import { puzzleConfig } from '@/app/store/computed'
import { rawPuzzleConfigs } from '@/app/store/state'
import { ref } from 'vue'
import { UpdatePuzzleConfigResponse } from '@/app/types/api'
import axios from 'axios'

/**
 * The user's puzzle config
 */
export function usePuzzleConfig(rawPuzzleName: string) {
  const failed = ref(false)
  const loading = ref(false)
  const puzzle = normalizePuzzleName(rawPuzzleName)

  const save = () => {
    failed.value = false
    loading.value = true

    return new Promise<void>((resolve, reject) => {
      axios.post<UpdatePuzzleConfigResponse>('/api/puzzle-configs', {
        config: JSON.stringify(puzzleConfig.value(puzzle)),
        puzzle,
      }).then(response => {
        // success
        rawPuzzleConfigs.value = response.data.puzzleConfigs

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

  return {
    failed,
    loading,
    save,
  }
}
