import { CreateSolvePayload, CreateSolveResponse } from '@/app/types/api'
import { ref } from 'vue'
import axios from 'axios'

type PendingSolve = {
  solveId: number,
  state: Record<string, unknown>,
}

/**
 * Create solve
 */
export function useCreateSolve() {
  const failed = ref(false)

  const loading = ref(false)

  /**
   * Create a solve model
   */
  const createSolve = (payload: CreateSolvePayload) => {
    loading.value = true
    failed.value = false

    return new Promise<PendingSolve>((resolve, reject) => {
      axios.post<CreateSolveResponse>('/api/solves', payload)
        .then(response => {
          // success
          resolve(response.data)
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
  }
}
