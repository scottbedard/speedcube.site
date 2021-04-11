<template>
  <h1 class="mb-2 font-bold text-lg">Security</h1>

  <Card padded>
    <form
      class="gap-6 grid max-w-xl mx-auto"
      @submit.prevent="submit">
      <Input
        label="Current password"
        type="password" />

      <Input
        label="New password"
        type="password" />

      <Input
        label="Confirm new password"
        type="password" />
      
      <div class="flex justify-end">
        <Button primary type="submit">
          Update password
        </Button>
      </div>
    </form>
  </Card>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Button, Card, Input } from '@/components'
  
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
      Input,
    },
    name: 'Security',
  })
  </script>
  