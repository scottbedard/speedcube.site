<template>
  <h1 class="tw-page-title">Reset your password</h1>

  <Card class="mx-auto max-w-lg" padded>
    <form class="grid gap-6" @submit.prevent="submit">
      <Input
        v-model="data.email"
        label="Email address"
        type="email"
        required
        :autofocus="!Boolean(route.query.email)"
        :disabled="loading || Boolean(route.query.email)"
        :error="fieldErrors.email" />

      <Input
        v-model="data.password"
        label="New password"
        type="password"
        required
        :autofocus="Boolean(route.query.email)"
        :disabled="loading"
        :error="fieldErrors.password" />

      <Input
        v-model="data.passwordConfirmation"
        label="Confirm new password"
        type="password"
        required
        :disabled="loading"
        :error="fieldErrors.passwordConfirmation" />

      <div class="flex justify-end">
        <Button
          class="w-full xs:w-auto"
          primary
          type="submit"
          :disabled="loading"
          :loading="loading">
          Reset password
        </Button>
      </div>
    </form>
  </Card>
</template>

<script lang="ts">
import { Button, Card, Input } from '@/components'
import { defineComponent } from 'vue'
import { useResetPassword } from '@/app/api'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { data, fieldErrors, loading, resetPassword } = useResetPassword()

    data.email = String(route.query.email)

    const submit = () => {
      resetPassword(route.params.token as string).then(() => {
        router.replace({ name: 'login' })
      })
    }

    return {
      data,
      fieldErrors,
      loading,
      route,
      submit,
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
