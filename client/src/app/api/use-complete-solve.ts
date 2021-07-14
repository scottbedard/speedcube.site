import { CompleteSolvePayload, CompleteSolveResponse } from '@/app/types/api'
import { ref } from 'vue'
import axios from 'axios'

export function useCompleteSolve() {
  const loading = ref(false)
  const failed = ref(false)

  /**
   * Complete a solve
   */
  const completeSolve = (payload: CompleteSolvePayload) => {
    failed.value = false
    loading.value = true

    return axios.post<CompleteSolveResponse>('/api/solves/complete', payload).catch(() => {
      // failed
      failed.value = true
    }).finally(() => {
      // complete
      loading.value = false
    })
  }

  return {
    completeSolve,
    failed,
    loading,
  }
}
