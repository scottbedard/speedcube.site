<template>
  <Button
    :disabled="disabled"
    :loading="loading"
    :primary="primary"
    @click="onClick">
    Click me
  </Button>

  <div class="gap-6 flex mt-6">
    <Checkbox v-model="disabled">Disabled</Checkbox>
    <Checkbox v-model="loading">Loading</Checkbox>
    <Checkbox v-model="primary">Primary</Checkbox>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Button, Checkbox } from '@/components'

export default defineComponent({
  setup() {
    const disabled = ref(false)
    const loading = ref(false)
    const primary = ref(true)

    const onClick = () => {
      alert('👋 Hello!')
    }

    return {
      disabled,
      loading,
      onClick,
      primary,
    }
  },
  components: {
    Button,
    Checkbox,
  },
  name: 'ButtonExample',
})
</script>
