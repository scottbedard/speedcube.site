<template>
  <div
    class="bg-gray-700 rounded shadow-xl"
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
    padded: Boolean,
  },
});
</script>
