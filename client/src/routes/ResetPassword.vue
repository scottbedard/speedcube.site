<template>
  <h1 class="tw-page-title">Reset your password</h1>

  <Card class="mx-auto max-w-lg" padded>
    <form class="grid gap-6" @submit.prevent="submit">
      <Input
        v-model="data.email"
        autofocus
        label="Email address"
        type="email"
        required />

      <Input
        v-model="data.password"
        label="New password"
        type="password"
        required />

      <Input
        v-model="data.passwordConfirmation"
        label="Confirm new password"
        type="password"
        required />

      <div class="flex justify-end">
        <Button
          class="w-full xs:w-auto"
          primary
          type="submit">
          Reset password
        </Button>
      </div>
    </form>
  </Card>
</template>

<script lang="ts">
import { Button, Card, Input } from '@/components'
import { defineComponent } from 'vue'
import { useResetPassword } from '@/app/behaviors'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const { data, resetPassword } = useResetPassword()

    const submit = () => {
      resetPassword(route.params.token as string)
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
  name: 'ResetPassword',
})
</script>
