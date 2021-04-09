<template>
  <h1 class="tw-page-title">Create an account</h1>

  <Card class="mb-6 mx-auto max-w-lg" padded>
    <form class="grid gap-6" @submit.prevent="submit">
      <Input
        v-model="data.username"
        autofocus
        label="Username"
        required
        :disabled="loading"
        :error="errors.username" />

      <Input
        v-model="data.email"
        label="Email address"
        type="email"
        required
        :disabled="loading"
        :error="errors.email" />

      <Input
        v-model="data.password"
        label="Password"
        type="password"
        required
        :disabled="loading"
        :error="errors.password" />

      <Input
        v-model="data.passwordConfirmation"
        label="Confirm password"
        type="password"
        required
        :disabled="loading" />

      <div class="flex justify-end">
        <Button
          class="w-full xs:w-auto"
          primary
          type="submit"
          :disabled="loading"
          :loading="loading">
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
import { Button, Card, Input } from '@/components'
import { defineComponent } from 'vue'
import { useCreateUser } from '@/app/api'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const { createUser, data, errors, loading } = useCreateUser()
    const router = useRouter()

    const submit = () => {
      createUser().then(() => {
        router.push({ name: 'home' })
      })
    }

    return {
      data,
      errors,
      loading,
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