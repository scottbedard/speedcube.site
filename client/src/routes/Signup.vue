<template>
  <h1 class="tw-page-title">Create an account</h1>

  <Card class="mb-6 mx-auto max-w-lg" padded>
    <form class="grid gap-6" @submit.prevent="submit">
      <Input
        autofocus
        label="Username" />

      <Input
        label="Email Address"
        type="email" />

      <Input
        label="Password"
        type="password" />

      <Input
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

export default defineComponent({
  setup() {
    const submit = () => {
      console.log('submit')
    }

    return {
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