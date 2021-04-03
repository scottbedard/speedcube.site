import { CreateUserResponse } from '@/app/types/api'
import { reactive, ref } from 'vue'
import { state } from '@/app/store/state'
import axios from 'axios'

/**
 * Create an account
 */
export function useCreateUser() {
  const data = reactive({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const loading = ref(false)

  const createUser = () => {
    loading.value = true

    return axios.post<CreateUserResponse>('/api/users', data).then((response) => {
      // success
      state.user = response.data.user
    }, (err) => {
      // failed
      console.log('failed', err)
    }).finally(() => {
      loading.value = false
    })
  }

  return {
    createUser,
    data,
    loading,
  }
}
