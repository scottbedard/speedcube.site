<template>
  <h1 class="tw-page-title">Create an account</h1>

  <Card class="mb-6 mx-auto max-w-lg" padded>
    <form class="grid gap-6" @submit.prevent="submit">
      <Input
        v-model="data.username"
        autofocus
        label="Username"
        required />

      <Input
        v-model="data.email"
        label="Email address"
        type="email"
        required />

      <Input
        v-model="data.password"
        label="Password"
        type="password"
        required />

      <Input
        v-model="data.passwordConfirmation"
        label="Confirm password"
        type="password"
        required />

      <div class="flex justify-end">
        <Button
          class="w-full xs:w-auto"
          primary
          type="submit">
          Sign up
        </Button>
      </div>
    </form>
  </Card>

  <p class="text-center">
    <RouterLink :to="{ name: 'login' }">Have an account? Click here to log in.</RouterLink>
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Button, Card, Input } from '@/components'
import { useCreateUser } from '@/app/behaviors/use-create-user'

export default defineComponent({
  setup() {
    const { createUser, data } = useCreateUser()

    const submit = () => {
      createUser()
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
  name: 'Signup',
})
</script>