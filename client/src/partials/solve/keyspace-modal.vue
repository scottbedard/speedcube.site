<template>
  <v-modal
    padded
    @dismiss="$emit('dismiss')">
    <form class="grid gap-6" @submit.prevent="onSubmit">
      <v-labeled-input
        v-model="keyspace"
        autofocus
        label="Keyspace Character"
        maxlength="1"
        placeholder="Enter keyspace character"
        required />

      <p>
        Keyspaces allow for diffferent layouts. To change keyspaces when solving, press Cmd or Ctrl and the assigned character.
      </p>

      <div class="flex flex-wrap gap-6 justify-between">
        <div class="flex items-center">
          <a
            v-if="activeKeyspace"
            class="flex items-center"
            href="#"
            @click.prevent="$emit('remove', keyspace)">
            <v-icon class="mr-2" name="trash-2" size="5" /> Delete keyspace
          </a>
        </div>
        <div class="flex flex-wrap items-center gap-12">
          <a
            href="#"
            @click.prevent="$emit('dismiss')">
            Cancel
          </a>
          <v-button type="submit">Add</v-button>
        </div>
      </div>
    </form>
  </v-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import VButton from '@/components/button.vue';
import VIcon from '@/components/icon.vue';
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
    VIcon,
    VLabeledInput,
    VModal,
  },
  emits: [
    'add',
    'dismiss',
    'remove',
  ],
  props: {
    activeKeyspace: {
      required: true,
      type: String,
    },
  },
});
</script>
