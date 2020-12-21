<template>
  <v-modal padded @dismiss="$emit('dismiss')">
    <div class="gap-6 grid">
      <h3 class="font-bold text-3xl">
        You're about to clear all bindings
      </h3>
      <p>
        This removes all key bindings and keyspaces. You could still recover your current setup by canceling, but any unsaved changes would be lost.
      </p>
      <div class="flex gap-12 items-center justify-end">
        <a
          class="text-gray-300"
          href="#"
          @click.prevent="$emit('dismiss')">
          Cancel
        </a>
        <v-button danger @click="$emit('confirm')">Clear All</v-button>
      </div>
    </div>
  </v-modal>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import VButton from '@/components/button.vue';
import VModal from '@/components/modal.vue';

export default defineComponent({
  components: {
    VButton,
    VModal,
  },
  emits: [
    'dismiss',
    'confirm',
  ],
});
</script>
