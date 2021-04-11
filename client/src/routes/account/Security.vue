<template>
  <h1 class="mb-2 font-bold text-lg">Change password</h1>

  <Card padded>
    <form
      class="gap-6 grid max-w-xl mx-auto"
      @submit.prevent="submit">
      <Input
        v-model="data.currentPassword"
        autofocus
        label="Current password"
        required
        type="password"
        :disabled="loading"
        :error="fieldErrors.currentPassword" />

      <Input
        v-model="data.password"
        label="New password"
        required
        type="password"
        :disabled="loading"
        :error="fieldErrors.password" />

      <Input
        v-model="data.passwordConfirmation"
        label="Confirm new password"
        required
        type="password"
        :disabled="loading"
        :error="fieldErrors.passwordConfirmation" />

      <div class="flex justify-end">
        <Button
          class="w-full xs:w-auto"
          primary
          type="submit"
          :disabled="loading"
          :loading="loading">
          Update
        </Button>
      </div>
    </form>
  </Card>
</template>

<script lang="ts">
  import { Button, Card, Input } from '@/components'
  import { defineComponent } from 'vue'
  import { useUpdateUser } from '@/app/api'
  
  export default defineComponent({
    setup() {
      const {
        data,
        fieldErrors,
        loading,
        updateUser,
      } = useUpdateUser({
        currentPassword: '',
        password: '',
        passwordConfirmation: '',
      })

      const submit = () => {
        updateUser().then(() => {
          data.password = ''
          data.passwordConfirmation = ''
          data.currentPassword = ''
        })
      }

      return {
        data,
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
    name: 'Security',
  })
  </script>
  