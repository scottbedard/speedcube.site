import { AbortSolvePayload } from '@/app/types/api'
import { ref } from 'vue'
import axios from 'axios'

/**
 * Abort solve
 */
export function useAbortSolve() {
  const loading = ref(false)

  const failed = ref(false)

  /**
   * Abort a solve
   */
  const abortSolve = (payload: AbortSolvePayload) => {
    failed.value = false
    loading.value = true

    return axios.post('/api/solves/abort', payload).catch(() => {
      // failed
      failed.value = true
    }).finally(() => {
      // complete
      loading.value = false
    })
  }

  return {
    abortSolve,
    failed,
    loading,
  }
}
