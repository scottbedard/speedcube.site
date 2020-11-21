<template>
  <v-color-picker />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VColorPicker from '@/components/color-picker.vue';

export default defineComponent({
  components: {
    VColorPicker,
  },
});
</script>
