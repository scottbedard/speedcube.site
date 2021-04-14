<template>
  <div>
    <h1 class="mb-2 font-bold text-lg">
      Privacy settings
    </h1>

    <Card padded>
      <form
        class="gap-6 grid max-w-xl mx-auto"
        @submit.prevent="submit">
        <div class="gap-4 grid">
          <Checkbox>
            Private mode
            <template #description>Your solves will not appear on the records page, and stats and replays will only be visible to you.</template>
          </Checkbox>

          <Checkbox>
            Quiet mode
            <template #description>Comments and reactions will be disabled for your solves.</template>
          </Checkbox>
        </div>
    
        <div class="flex justify-end">
          <Button
            class="w-full xs:w-auto"
            primary
            type="submit">
            Update
          </Button>
        </div>
      </form>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Button, Card, Checkbox } from '@/components'

export default defineComponent({
  setup() {
    const submit = () => {
      console.log('submit')
    }

    return {
      submit
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