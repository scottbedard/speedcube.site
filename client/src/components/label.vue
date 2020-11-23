<template>
  <label>
    <div
      v-text="label"
      class="font-bold mb-1"
      :data-required="required || undefined" />
    <slot />
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    label: {
      required: true,
      type: String,
    },
    required: {
      default: false,
      type: Boolean,
    },
  },
});
</script>

<style scoped>
[data-required]:after {
  content: '';
  height: 0.35rem;
  width: 0.35rem;
  @apply align-text-top inline-block bg-green-500 ml-1 rounded-full;
}
</style>
