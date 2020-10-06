<template>
  <v-input
    class="mb-2"
    v-model="value" />
  <p v-if="!value">The input is empty</p>
  <p v-else v-text="value" />
</template>

<script>
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