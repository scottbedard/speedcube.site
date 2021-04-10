import { ref } from 'vue'
import { user } from '@/app/store/state'
import axios from 'axios'

/**
 * Log the user out
 */
export function useLogout() {
  const loading = ref(false)

  const logout = () => {
    return axios.get<void>('/api/auth/logout').then(() => {
      // success
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