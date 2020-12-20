<template>
  <v-modal
    padded
    @dismiss="$emit('dismiss')">
    <form
      class="gap-6 grid md:grid-cols-2"
      @submit.prevent="onSubmit">
      <v-labeled-input
        v-model="form.key"
        autofocus
        label="Key binding"
        placeholder="Enter a key"
        required />

      <v-labeled-input
        v-model="form.turn"
        label="Turn to execute"
        placeholder="Enter a puzzle turn"
        required />

      <div class="flex gap-6 items-center justify-end md:col-span-2">
        <a
          class="text-gray-500 hover:text-gray-400"
          href="#"
          @click.prevent="$emit('dismiss')">
          Cancel
        </a>
        <v-button type="submit">Add</v-button>
      </div>
    </form>
  </v-modal>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import VButton from '@/components/button.vue';
import VLabeledInput from '@/components/labeled-input.vue';
import VModal from '@/components/modal.vue';

export default defineComponent({
  setup() {
    const form = reactive({
      key: '',
      binding: '',
    });

    const onSubmit = () => {
      console.log('submit');
    }

    return {
      form,
      onSubmit,
    };
  },
  components: {
    VButton,
    VLabeledInput,
    VModal,
  },
});
</script>
