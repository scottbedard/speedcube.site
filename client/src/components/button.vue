<template>
  <button
    class="border-none font-bold h-10 px-6 rounded text-white focus:outline-none focus:shadow-outline hover:shadow"
    :class="[color]">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  computed: {
    color() {
      return 'bg-green-600 hover:bg-green-500';
    },
  },
});
</script>