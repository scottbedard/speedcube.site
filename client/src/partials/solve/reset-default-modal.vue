<template>
  <v-modal padded @dismiss="$emit('dismiss')">
    <div class="gap-6 grid">
      <h3 class="font-bold text-3xl">
        You're about to reset to default controls
      </h3>
      <p>
        This will reset all bindings and keyspaces to their default state. You could still recover your current setup by pressing cancel, but any unsaved changes would be lost.
      </p>
      <div class="flex gap-12 items-center justify-end">
        <a
          class="text-gray-300"
          href="#"
          @click.prevent="$emit('dismiss')">
          Cancel
        </a>
        <v-button danger @click="$emit('reset')">Reset</v-button>
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
    'reset',
  ],
});
</script>
