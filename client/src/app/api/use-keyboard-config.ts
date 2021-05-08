import { cloneDeep } from 'lodash-es'
import { keyboardConfig } from '@/app/store/computed'
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
    loading.value = true

    return new Promise<void>((resolve, reject) => {
      axios.post('/api/keyboard-configs', {
        config: config.value,
        puzzle,
      }).then(() => {
        // success
        resolve()
      }, () => {
        // failure
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
