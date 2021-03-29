<template>
  <h1 class="tw-page-title">Create an account</h1>

  <Card class="mb-6 mx-auto max-w-lg" padded>
    <form class="grid gap-6" @submit.prevent="submit">
      <Input
        v-model="data.username"
        autofocus
        label="Username" />

      <Input
        v-model="data.email"
        label="Email Address"
        type="email" />

      <Input
        v-model="data.password"
        label="Password"
        type="password" />

      <Input
        v-model="data.passwordConfirmation"
        label="Confirm Password"
        type="password" />

      <div class="flex justify-end">
        <Button primary type="submit">Sign Up</Button>
      </div>
    </form>
  </Card>

  <p class="text-center">
    Already have an account? <RouterLink :to="{ name: 'login' }">Click here to log in.</RouterLink>
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Button, Card, Input } from '@/components'
import { useCreateAccount } from '@/app/behaviors/create-account'

export default defineComponent({
  setup() {
    const { createAccount, data } = useCreateAccount()

    const submit = () => {
      createAccount()
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