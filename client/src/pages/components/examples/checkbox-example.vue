<template>
  <v-checkbox :checked="true">
    I agree to the terms and conditions
  </v-checkbox>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VCheckbox from '@/components/checkbox.vue';

export default defineComponent({
  components: {
    VCheckbox,
  },
});
</script>