<template>
  <v-modal
    padded
    size="xl"
    @dismiss="$emit('dismiss')">
    <form class="grid gap-6" @submit.prevent="onSubmit">
      <v-labeled-input
        v-model="keyspace"
        autofocus
        label="Keyspace"
        maxlength="1"
        placeholder="Enter keyspace character" />
      <div class="flex justify-between">
        <a
          class="flex items-center text-gray-300"
          href="#"
          @click.prevent>
          <v-icon class="mr-2" name="trash-2" size="5" /> Delete keyspace
        </a>
        <div class="flex flex-wrap items-center gap-8">
          <a
            class="text-gray-300"
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
    const keyspace = ref(props.activeKeyspace);

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
  ],
  props: {
    activeKeyspace: {
      required: true,
      type: String,
    },
  },
});
</script>
