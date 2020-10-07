<template>
  <v-input
    v-model="value"
    class="max-w-md"
    placeholder="Enter something awesome" />
  <div class="text-gray-400 mt-4 text-sm">
    <p v-if="!value">The input is empty</p>
    <p v-else v-text="value" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VInput from '@/components/input.vue';

export default defineComponent({
  data() {
    return {
      value: '',
    };
  },
  components: {
    VInput,
  },
});
</script>