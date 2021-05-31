import { CreateSolvePayload, CreateSolveResponse } from '@/app/types/api'
import { ref } from 'vue'
import { timeout } from '@/app/utils'
import axios from 'axios'

/**
 * Create solve
 */
export function useCreateSolve() {
  const failed = ref(false)

  const loading = ref(false)
  
  const pendingSolve = ref<{
    solveId: number,
    state: Record<string, unknown>,
  }>({
    solveId: 0,
    state: {},
  })

  /**
   * Create a solve model
   */
  const createSolve = (payload: CreateSolvePayload) => {
    loading.value = true
    failed.value = false

    return new Promise<void>((resolve, reject) => {
      let solveId = 0
      let state: Record<string, unknown> = {}

      const xhr = axios.post<CreateSolveResponse>('/api/solves', payload)
        .then(response => {
          // success
          pendingSolve.value.solveId = response.data.solveId
          pendingSolve.value.state = response.data.state
        }, () => {
          // failed
          failed.value = true
        })

      Promise.all([xhr, timeout(3000)])
        .then(() => resolve())
        .catch(() => reject())
        .finally(() => {
          // complete
          loading.value = false
        })
    })
  }

  return {
    createSolve,
    failed,
    loading,
    pendingSolve,
  }
}
