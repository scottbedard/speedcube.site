<template>
  <p class="leading-normal max-w-4xl mb-6 mx-auto text-center">
    These are your current key bindings, displayed in <span class="inline-flex items-center">
    &quot;key <v-icon class="mx-px" name="chevron-right" stroke="3" /> turn&quot;</span> format.
    Feel free to make turns while the editor is open. Pressing a key will highlight the
    associated binding if one exists.
  </p>

  <div class="gap-x-12 flex flex-wrap justify-center leading-loose tracking-wide sm:justify-start">
    <a class="inline-flex items-center" href="#" @click.prevent>
      <v-icon class="mr-2" name="plus" size="5" stroke="4" /> Add Binding
    </a>
    <a class="inline-flex items-center" href="#" @click.prevent>
      <v-icon class="mr-2" name="hash" size="5" stroke="3" /> Add Keyspace
    </a>
    <a class="inline-flex items-center" href="#" @click.prevent>
      <v-icon class="mr-2" name="code" size="5" stroke="3" /> Edit JSON
    </a>
    <a class="inline-flex items-center" href="#" @click.prevent>
      <v-icon class="mr-2" name="rotate-ccw" size="5" stroke="3" /> Reset Default
    </a>
    <a class="inline-flex items-center" href="#" @click.prevent>
      <v-icon class="mr-2" name="trash-2" size="5" stroke="3" /> Clear All
    </a>
  </div>

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
