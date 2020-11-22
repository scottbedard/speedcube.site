<template>
  <v-color-picker v-model="color" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VColorPicker from '@/components/color-picker.vue';

export default defineComponent({
  data() {
    return {
      color: '#bada55',
    };
  },
  components: {
    VColorPicker,
  },
});
</script>
