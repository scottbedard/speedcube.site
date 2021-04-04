<template>
  <h1 class="tw-page-title">Password reset</h1>

  <Card class="mx-auto max-w-lg" padded>
    <form class="grid gap-6" @submit.prevent="submit">
      <Input
        v-model="data.email"
        label="Email Address"
        type="email"
        required />

      <div class="flex justify-end">
        <Button
          class="w-full xs:w-auto"
          primary
          type="submit">
          Submit
        </Button>
      </div>
    </form>
  </Card>
</template>

<script lang="ts">
import { Button, Card, Input } from '@/components'
import { defineComponent } from 'vue'
import { useForgotPassword } from '@/app/behaviors'

export default defineComponent({
  setup() {
    const { data, forgotPassword } = useForgotPassword()

    const submit = () => {
      forgotPassword()
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
  name: 'ForgotPassword',
})
</script>
