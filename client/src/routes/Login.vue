<template>
  <h1 class="tw-page-title">Welcome back</h1>

  <Card class="mb-6 mx-auto max-w-lg" padded>
    <form class="grid gap-6" @submit.prevent="submit">
      <Input
        v-model="data.username"
        autofocus
        label="Username"
        required
        :disabled="loading" />

      <Input
        v-model="data.password"
        label="Password"
        type="password"
        required
        :disabled="loading" />

      <div class="flex flex-wrap items-center gap-6 justify-between">
        <Checkbox v-model="data.remember" :disabled="loading">
          Remember me
        </Checkbox>

        <Button
          class="w-full xs:w-auto"
          primary
          type="submit"
          :disabled="loading"
          :loading="loading">
          Login
        </Button>
      </div>
    </form>
  </Card>

  <p class="flex flex-wrap justify-center gap-x-8 text-center">
    <RouterLink :to="{ name: 'forgot-password' }">Forgot password? Click here to reset it.</RouterLink>
  </p>
</template>

<script lang="ts">
import { Button, Card, Checkbox, Input } from '@/components'
import { defineComponent } from 'vue'
import { useLogin } from '@/app/api'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const { data, loading, login } = useLogin()
    const router = useRouter()

    const submit = () => {
      login().then(() => {
        router.replace({ name: 'home' })
      })
    }

    return {
      data,
      loading,
      submit
    }
  },
  components: {
    Button,
    Card,
    Checkbox,
    Input,
  },
  name: 'Login',
})
</script>