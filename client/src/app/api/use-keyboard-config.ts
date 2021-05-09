import { cloneDeep } from 'lodash-es'
import { keyboardConfig } from '@/app/store/computed'
import { KeyboardConfig } from '@/app/types/models'
import { keyboardConfigs } from '@/app/store/state'
import { normalizePuzzleName } from '@/app/utils'
import { ref } from 'vue'
import axios from 'axios';

/**
 * The user's keyboard config
 */
export function useKeyboardConfig(rawPuzzleName: string) {
  const failed = ref(false)
  const loading = ref(false)
  const puzzle = normalizePuzzleName(rawPuzzleName)
  const config = ref(cloneDeep(keyboardConfig.value(puzzle)))

  const save = () => {
    failed.value = false
    loading.value = true

    return new Promise<void>((resolve, reject) => {
      axios.post<KeyboardConfig[]>('/api/keyboard-configs', {
        config: config.value,
        puzzle,
      }).then(response => {
        // success
        keyboardConfigs.value = response.data

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
    config,
    failed,
    loading,
    save,
  }
}
