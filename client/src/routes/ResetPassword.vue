<template>
  <h1 class="tw-page-title">Reset your password</h1>

  <div
    v-if="errorMessage"
    v-text="errorMessage"
    class="mb-6 text-center text-red-500" />

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
import { computed, defineComponent } from 'vue'
import { useResetPassword } from '@/app/api'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const { data, failed, fieldErrors, invalid, loading, resetPassword } = useResetPassword()
    const route = useRoute()
    const router = useRouter()

    data.email = String(route.query.email)

    const errorMessage = computed(() => {
      if (invalid.value) {
        return
      }

      if (failed.value) {
        return 'An unknown error occured.'
      }
    })

    const submit = () => {
      resetPassword(route.params.token as string).then(() => {
        router.replace({ name: 'login' })
      })
    }

    return {
      data,
      fieldErrors,
      errorMessage,
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
