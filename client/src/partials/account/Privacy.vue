<template>
  <div>
    <h1 class="mb-2 font-bold text-lg">
      Privacy settings
    </h1>

    <Card padded>
      <form
        class="gap-6 grid max-w-xl mx-auto"
        @submit.prevent="submit">
        <Checkbox
          v-model="data.privateMode"
          :disabled="loading">
          Private mode
          <template #description>Your solves will not appear on the records page, and stats and replays will only be visible to you.</template>
        </Checkbox>

        <Checkbox
          v-model="data.safeMode"
          :disabled="loading">
          Safe mode
          <template #description>Comments and reactions will be disabled for your solves.</template>
        </Checkbox>
    
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
import { Button, Card, Checkbox } from '@/components'
import { defineComponent } from 'vue'
import { user } from '@/app/store/state'
import { useUpdateUser } from '@/app/api'

export default defineComponent({
  setup() {
    const {
      data,
      loading,
      updateUser,
    } = useUpdateUser({
      privateMode: user.value?.privateMode ?? false,
      safeMode: user.value?.safeMode ?? false,
    })

    const submit = () => {
      updateUser().then(() => {
        alert({
          text: 'Privacy settings updated.',
          type: 'success',
        })
      })
    }

    return {
      data,
      loading,
      submit,
    }
  },
  components: {
    Button,
    Card,
    Checkbox,
  },
  name: 'Privacy'
})
</script>