<template>
  <Card
    class="max-w-sm"
    :padded="padded">
    Hello from a card
  </Card>

  <div class="gap-6 flex mt-6">
    <Checkbox v-model="padded">Padded</Checkbox>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Card, Checkbox } from '@/components'

export default defineComponent({
  setup() {
    const padded = ref(true)

    return {
      padded
    }
  },
  components: {
    Card,
    Checkbox,
  },
  name: 'CardExample',
})
</script>
