<template>
  <RangeInput
    v-model="value"
    class="max-w-sm"
    :min="0"
    :max="100" />

  <div class="gap-6 flex mt-6">
    Value: {{ value }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { RangeInput } from '@/components'

export default defineComponent({
  setup() {
    const value = ref(0)

    return {
      value
    }
  },
  components: {
    RangeInput,
  },
  name: 'RangeInputExample',
})
</script>
