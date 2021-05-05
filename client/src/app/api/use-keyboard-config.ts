import { cloneDeep } from 'lodash-es'
import { keyboardConfig } from '@/app/store/computed'
import { normalizePuzzleName } from '@/app/utils'
import { ref } from 'vue'
import { keyboardConfigs } from '../store/state'

/**
 * The user's keyboard config
 */
export function useKeyboardConfig(rawPuzzleName: string) {
  const failed = ref(false)
  const loading = ref(false)
  const puzzle = normalizePuzzleName(rawPuzzleName)
  const config = ref(cloneDeep(keyboardConfig.value(puzzle)))

  const save = () => {
    console.log('save', JSON.parse(JSON.stringify(config.value)))
  }
  
  return {
    config,
    failed,
    loading,
    save,
  }
}
