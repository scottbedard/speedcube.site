<template>
  <Checkbox v-model="checked">
    I agree to the terms and conditions
  </Checkbox>

  <div class="gap-6 flex mt-6">
    Checked: {{ checked }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Checkbox } from '@/components'

export default defineComponent({
  setup() {
    const checked = ref(false)

    return {
      checked,
    }
  },
  components: {
    Checkbox,
  },
  name: 'CheckboxExample',
})
</script>
