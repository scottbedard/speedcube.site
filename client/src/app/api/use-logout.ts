import { ref } from 'vue'
import { rawKeyboardConfigs, rawPuzzleConfigs, user } from '@/app/store/state'
import axios from 'axios'

/**
 * Log the user out
 */
export function useLogout() {
  const loading = ref(false)

  const logout = () => {
    return axios.get<void>('/api/auth/logout').then(() => {
      // success
      rawKeyboardConfigs.value = []
      rawPuzzleConfigs.value = []
      user.value = null
    }).finally(() => {
      // complete
      loading.value = false
    })
  }

  return {
    loading,
    logout,
  }
}