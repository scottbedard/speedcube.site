import { keyboardConfig } from '@/app/store/computed'
import { normalizePuzzleName } from '@/app/utils'
import { rawKeyboardConfigs } from '@/app/store/state'
import { ref } from 'vue'
import { UpdateKeyboardConfigResponse } from '@/app/types/api'
import axios from 'axios';

/**
 * The user's keyboard config
 */
export function useKeyboardConfig(rawPuzzleName: string) {
  const failed = ref(false)
  const loading = ref(false)
  const puzzle = normalizePuzzleName(rawPuzzleName)

  const save = () => {
    failed.value = false
    loading.value = true

    return new Promise<void>((resolve, reject) => {
      axios.post<UpdateKeyboardConfigResponse>('/api/keyboard-configs', {
        config: JSON.stringify(keyboardConfig.value(puzzle)),
        puzzle,
      }).then(response => {
        // success
        rawKeyboardConfigs.value = response.data.keyboardConfigs

        resolve()
      }, () => {
        // failure
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
