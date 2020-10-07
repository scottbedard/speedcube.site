<template>
  <v-range-input
    v-model="value"
    class="max-w-sm"
    :max="100"
    :min="0"
    :step="1" />
  <div class="text-gray-400 mt-4 text-sm">
    <p>Value: {{ value }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VRangeInput from '@/components/range-input.vue';

export default defineComponent({
  data() {
    return {
      value: 50,
    };
  },
  components: {
    VRangeInput,
  },
});
</script>