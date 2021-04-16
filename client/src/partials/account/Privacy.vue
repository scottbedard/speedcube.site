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
          v-model="data.publicSolves"
          :disabled="loading">
          Publish solves
          <template #description>Your solves will be public and appear on the records page.</template>
        </Checkbox>

        <Checkbox
          v-model="data.publicStats"
          :disabled="loading">
          Publish stats
          <template #description>Your stats page will be public and link to replays of all your solves.</template>
        </Checkbox>

        <Checkbox
          v-model="data.allowComments"
          :disabled="loading">
          Allow comments
          <template #description>Users will be able to comment and react to your solves.</template>
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
      allowComments: user.value?.allowComments ?? true,
      publicSolves: user.value?.publicSolves ?? true,
      publicStats: user.value?.publicStats ?? true,
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