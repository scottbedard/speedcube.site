<template>
  <div
    class="bg-gray-700 rounded shadow-lg"
    :class="{
      'p-6': padded,
    }">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    padded: {
      default: false,
      type: Boolean,
    },
  },
});
</script>
