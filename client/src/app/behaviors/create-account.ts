import { reactive, ref } from 'vue'
import axios from 'axios'

/**
 * Create an account
 */
export function useCreateAccount() {
  const data = reactive({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const loading = ref(false)

  const createAccount = () => {
    loading.value = true

    return axios.post('/api/users', data).then(() => {
      // success
      console.log('success')
    }, (err) => {
      // failed
      console.log('failed', err)
    }).finally(() => {
      loading.value = false
    })
  }

  return {
    createAccount,
    data,
    loading,
  }
}
