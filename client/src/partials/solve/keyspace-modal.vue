<template>
  <v-modal
    padded
    size="sm"
    @dismiss="$emit('dismiss')">
    <form class="grid gap-6" @submit.prevent="onSubmit">
      <v-labeled-input
        v-model="keyspace"
        autofocus
        label="Keyspace"
        maxlength="1"
        placeholder="Enter keyspace character" />
      <div class="flex justify-end">
        <v-button type="submit">Add</v-button>
      </div>
    </form>
  </v-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import VButton from '@/components/button.vue';
import VLabeledInput from '@/components/labeled-input.vue';
import VModal from '@/components/modal.vue';

export default defineComponent({
  setup(props, { emit }) {
    const keyspace = ref('');

    const onSubmit = () => {
      emit('add', keyspace.value)
    }

    return {
      keyspace,
      onSubmit,
    };
  },
  components: {
    VButton,
    VLabeledInput,
    VModal,
  },
  emits: [
    'add',
    'dismiss',
  ],
});
</script>
