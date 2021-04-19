<template>
  <ColorPicker v-model="color" />

  <div class="gap-6 flex mt-6">
    Color: {{ color }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ColorPicker } from '@/components'

export default defineComponent({
  setup() {
    const color = ref('#10B981')

    return {
      color
    }
  },
  components: {
    ColorPicker
  },
  name: 'ColorPickerExample',
})
</script>
