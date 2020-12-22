<template>
  <v-modal
    padded
    @dismiss="$emit('dismiss')">
    <form @submit.prevent="onSubmit">
      <div class="gap-6 grid md:grid-cols-2">
        <v-labeled-input
          v-model="form.key"
          autofocus
          label="Key"
          maxlength="1"
          placeholder="Enter a key"
          required />

        <v-labeled-input
          v-model="form.turn"
          label="Turn to execute"
          placeholder="Enter a puzzle turn"
          required />

        <div class="flex flex-wrap gap-8 items-center justify-between md:col-span-2">
          <div>
            <a
              v-if="initialValue"
              class="flex items-center hover:text-red-500"
              href="#"
              @click.prevent="onRemove">
              <v-icon class="mr-2" name="trash-2" size="5" /> Delete Binding
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
      </div>
    </form>
  </v-modal>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue';
import VButton from '@/components/button.vue';
import VIcon from '@/components/icon.vue';
import VLabeledInput from '@/components/labeled-input.vue';
import VModal from '@/components/modal.vue';

export default defineComponent({
  setup(props, { emit }) {
    const form = reactive({
      key: props.initialValue?.key ?? '',
      turn: props.initialValue?.turn ?? '',
    });

    const onRemove = () => {
      emit('remove', form.key);
    }

    const onSubmit = () => {
      emit('add', form);
    }

    return {
      form,
      onRemove,
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
    initialValue: {
      type: Object as PropType<null | { key: string, turn: string }>,
    },
  },
});
</script>
