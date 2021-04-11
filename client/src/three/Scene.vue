<template>
  <div class="border-4 border-dashed">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
  name: 'Scene',
})
</script>
