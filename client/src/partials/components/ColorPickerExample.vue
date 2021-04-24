<template>
  <ColorPicker
    v-model="color"
    :disabled="disabled" />

  <div class="gap-6 flex mt-6">
    Color: {{ color }}
  </div>

  <div class="gap-6 flex mt-6">
    <Checkbox v-model="disabled">Disabled</Checkbox>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Checkbox, ColorPicker } from '@/components'

export default defineComponent({
  setup() {
    const color = ref('#10B981')
    const disabled = ref(false)

    return {
      color,
      disabled,
    }
  },
  components: {
    Checkbox,
    ColorPicker,
  },
  name: 'ColorPickerExample',
})
</script>
