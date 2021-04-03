<template>
  <h1 class="tw-page-title">Welcome back</h1>

  <Card class="mb-6 mx-auto max-w-lg" padded>
    <form class="grid gap-6" @submit.prevent="submit">
      <Input
        v-model="data.username"
        autofocus
        label="Username"
        required />

      <Input
        v-model="data.password"
        label="Password"
        type="password"
        required />
      
      <div class="flex flex-wrap items-center gap-x-4 gap-y-2 justify-end">
        <RouterLink :to="{ name: 'forgot-password' }">Forgot password?</RouterLink>
        <Button primary type="submit">Login</Button>
      </div>
    </form>
  </Card>

  <p class="flex flex-wrap justify-center gap-x-8 text-center">
    <RouterLink :to="{ name: 'create-account' }">Click here to create an account.</RouterLink>
  </p>
</template>

<script lang="ts">
import { Button, Card, Input } from '@/components'
import { defineComponent } from 'vue'
import { useLogin } from '@/app/behaviors'

export default defineComponent({
  setup() {
    const { data } = useLogin()

    const submit = () => {
      console.log('submit')
    }

    return {
      data,
      submit
    }
  },
  components: {
    Button,
    Card,
    Input,
  },
  name: 'Login',
})
</script>