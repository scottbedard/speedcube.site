<template>
  <div class="gap-20 grid">
    <div class="flex justify-center">
      <v-button>
        Scramble
      </v-button>
    </div>

    <div class="gap-x-16 gap-y-6 flex flex-wrap justify-center text-center">
      <router-link
        class="flex items-center"
        :to="{ name: 'puzzles' }">
        <v-icon
          class="mr-3"
          name="box"
          size="6" />
          Change Puzzles
      </router-link>
  
      <router-link
        class="flex items-center"
        :to="{ name: 'solve-config' }">
        <v-icon
          class="mr-3 rotate-90 transform"
          name="sliders"
          size="5" />
        Customize Appearance
      </router-link>

      <router-link
        class="flex items-center"
        :to="{ name: 'solve-controls' }">
        <v-icon
          class="mr-3"
          name="hash"
          size="5" />
          Edit Key Bindings
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VButton from '@/components/button.vue';
import VIcon from '@/components/icon.vue';

export default defineComponent({
  components: {
    VButton,
    VIcon,
  },
});
</script>
