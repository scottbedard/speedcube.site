<template>
  <div
    :class="[
      'bg-gray-50 rounded-lg shadow-lg dark:bg-gray-800',
      {
        'p-6': padded,
      }
    ]">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'Card',
  props: {
    padded: {
      default: false,
      type: Boolean,
    },
  },
})
</script>