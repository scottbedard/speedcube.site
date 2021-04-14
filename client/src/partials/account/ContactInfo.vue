<template>
  <div>
    <h1 class="mb-2 font-bold text-lg">
      Contact information
    </h1>

    <Card padded>
      <form
        class="gap-6 grid max-w-xl mx-auto"
        @submit.prevent="submit">
        <Input
          disabled
          label="Username"
          required
          :model-value="user?.username"
          :error="fieldErrors.email" />

        <Input
          v-model="data.email"
          autofocus
          label="Email address"
          required
          type="email"
          :disabled="loading"
          :error="fieldErrors.email" />

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
  </div>
</template>

<script lang="ts">
import { alert } from '@/app/alerts'
import { Button, Card, Input } from '@/components'
import { defineComponent } from 'vue'
import { user } from '@/app/store/state'
import { useUpdateUser } from '@/app/api'

export default defineComponent({
  setup() {
    const {
      data,
      fieldErrors,
      loading,
      updateUser,
    } = useUpdateUser({
      email: user.value?.email ?? '',
    })

    const submit = () => {
      updateUser().then(() => {
        alert({
          text: 'Successfully updated profile.',
          type: 'success',
        })
      })
    }

    return {
      data,
      fieldErrors,
      loading,
      submit,
      updateUser,
      user,
    }
  },
  components: {
    Button,
    Card,
    Input,
  },
  name: 'ContactInfo',
})
</script>
