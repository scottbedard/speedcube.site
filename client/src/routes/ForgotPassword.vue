<template>
  <h1 class="tw-page-title">Password reset</h1>

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
        :disabled="loading"
        :error="fieldErrors.email" />

      <div class="flex justify-end">
        <Button
          class="w-full xs:w-auto"
          primary
          type="submit"
          :disabled="loading"
          :loading="loading">
          Submit
        </Button>
      </div>
    </form>
  </Card>
</template>

<script lang="ts">
import { Button, Card, Input } from '@/components'
import { computed, defineComponent } from 'vue'
import { useForgotPassword } from '@/app/api'

export default defineComponent({
  setup() {
    const {
      data,
      failed,
      fieldErrors,
      forgotPassword,
      invalid,
      loading,
      unauthorized,
    } = useForgotPassword()

    const errorMessage = computed(() => {
      if (invalid.value) {
        return
      }

      if (unauthorized.value) {
        return 'No user exists with that email address.'
      }

      if (failed.value) {
        return 'An unknown error occured.'
      }
    })

    const submit = () => {
      forgotPassword()
    }

    return {
      data,
      errorMessage,
      fieldErrors,
      loading,
      submit,
    }
  },
  components: {
    Button,
    Card,
    Input,
  },
  name: 'ForgotPassword',
})
</script>
