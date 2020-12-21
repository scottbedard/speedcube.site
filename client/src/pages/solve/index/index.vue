<template>
  <div class="gap-12 flex flex-wrap justify-center text-center">
    <router-link
      class="flex items-center"
      :to="{ name: 'solve-config' }">
      <v-icon
        class="mr-2 rotate-90 transform"
        name="sliders"
        size="5" />
      Puzzle Settings
    </router-link>

    <router-link
      class="flex items-center"
      :to="{ name: 'solve-controls' }">
      <v-icon
        class="mr-2"
        name="code"
        size="5" />
        Key Bindings
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VIcon from '@/components/icon.vue';

export default defineComponent({
  components: {
    VIcon,
  },
});
</script>
