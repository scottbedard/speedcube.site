<template>
  <h1 class="tw-page-title">Create an account</h1>

  <Card class="grid gap-6 mx-auto max-w-lg" padded>
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
  </Card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Card, Input } from '@/components'

export default defineComponent({
  components: {
    Card,
    Input,
  },
  name: 'Signup',
})
</script>