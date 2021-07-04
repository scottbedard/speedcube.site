import { CreateSolvePayload, CreateSolveResponse } from '@/app/types/api'
import { ref } from 'vue'
import axios from 'axios'

/**
 * Create solve
 */
export function useCreateSolve() {
  const failed = ref(false)

  const loading = ref(false)
  
  const pendingSolve = ref({
    solveId: 0,
    state: {} as Record<string, unknown>,
  })

  /**
   * Create a solve model
   */
  const createSolve = (payload: CreateSolvePayload) => {
    loading.value = true
    failed.value = false

    return new Promise<void>((resolve, reject) => {
      axios.post<CreateSolveResponse>('/api/solves', payload)
        .then(response => {
          // success
          pendingSolve.value.solveId = response.data.solveId
          pendingSolve.value.state = response.data.state

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
    createSolve,
    failed,
    loading,
    pendingSolve,
  }
}
