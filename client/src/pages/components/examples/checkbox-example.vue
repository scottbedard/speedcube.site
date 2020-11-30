<template>
  <v-checkbox v-model="agreed">
    I agree to the terms and conditions
  </v-checkbox>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VCheckbox from '@/components/checkbox.vue';

export default defineComponent({
  data() {
    return {
      agreed: false,
    };
  },
  components: {
    VCheckbox,
  },
});
</script>