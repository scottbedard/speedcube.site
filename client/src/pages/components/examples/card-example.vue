<template>
  <v-card class="max-w-md" padded>
    Hello from the card component
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VCard from '@/components/card.vue';

export default defineComponent({
  components: {
    VCard,
  },
});
</script>
