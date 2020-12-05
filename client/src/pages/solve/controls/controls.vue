<template>
  <p class="leading-normal max-w-4xl mb-6 mx-auto text-center">
    These are your current key bindings, displayed in <span class="inline-flex items-center">
    &quot;key <v-icon class="mx-px" name="chevron-right" stroke="3" /> turn&quot;</span> format.
    Feel free to make turns while the editor is open. Pressing a key will highlight the
    associated binding if one exists.
  </p>

  <div class="flex justify-end">
    <v-button disabled>Save</v-button>
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
