<template>
  <v-button @click="onClick">Click me</v-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VButton from '@/components/button.vue';

export default defineComponent({
  components: {
    VButton,
  },
  methods: {
    onClick() {
      alert('Hello 👋');
    },
  },
});
</script>