<template>
  <svg
    class="animate-spin"
    viewBox="134 73 41 41"
    xmlns="http://www.w3.org/2000/svg"
    :class="[color, size]">
    <path
      class="stroke-current"
      d="M142.114,105.059 c-4.002-4.376-5.601-10.721-3.64-16.765c1.318-4.052,4.011-7.271,7.39-9.312"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="5.28"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    color: {
      default: 'text-gray-500',
      type: String,
    },
    size: {
      default: 'w-8',
      type: String,
    },
  },
});
</script>
