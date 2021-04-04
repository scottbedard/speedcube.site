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

      <div class="flex flex-wrap items-center gap-6 justify-between">
        <Checkbox v-model="data.remember">
          Remember me
        </Checkbox>

        <Button
          class="w-full xs:w-auto"
          primary
          type="submit">
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
import { useLogin } from '@/app/behaviors'

export default defineComponent({
  setup() {
    const { data, login } = useLogin()

    const submit = () => {
      login()
    }

    return {
      data,
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