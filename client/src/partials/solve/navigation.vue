<template>
  <div class="text-lg">
    <a
      class="flex items-center"
      href="#"
      @click.prevent>
      <v-icon
        class="mr-2 rotate-90 transform"
        name="sliders"
        size="6" />
      Customize
    </a>
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
