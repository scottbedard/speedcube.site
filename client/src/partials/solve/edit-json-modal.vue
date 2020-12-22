<template>
  <v-modal
    padded
    @dismiss="$emit('dismiss')">
    <form
      class="grid gap-6"
      @submit.prevent="onSubmit">
      <v-labeled-input
        v-model="json"
        autofocus
        disable-spellcheck
        label="Keyboard Configuration"
        monospace-input
        placeholder="Enter JSON keyboard configuration"
        required />

      <p>
        Be careful editing this, invalid JSON can cause errors. This primarily exists to make copy / pasting between puzzles easier.
      </p>

      <p
        v-if="!isValid"
        class="flex items-center text-red-500">
        <v-icon class="mr-2" name="alert-triangle" size="5" />
        This does not appear to be valid JSON.
      </p>
      
      <div class="flex gap-6 items-center justify-between">
        <a
          class="flex items-center"
          href="#"
          @click.prevent="onCopy">
          <v-icon class="mr-2" name="clipboard" size="5" /> Copy to clipboard
        </a>
        <div class="flex flex-wrap items-center gap-8">
          <a
            href="#"
            @click.prevent="$emit('dismiss')">
            Cancel
          </a>
          <v-button type="submit" :disabled="!isValid">
            Apply
          </v-button>
        </div>
      </div>
    </form>
  </v-modal>
</template>


<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import { KeyboardConfig } from '@/types/puzzle';
import copy from 'copy-to-clipboard';
import VButton from '@/components/button.vue';
import VIcon from '@/components/icon.vue';
import VLabeledInput from '@/components/labeled-input.vue';
import VModal from '@/components/modal.vue';

export default defineComponent({
  setup(props, { emit }) {
    const json = ref(JSON.stringify(props.pendingKeyboardConfig));

    const isValid = computed(() => {
      // this should probably be fleshed out eventually,
      // for now we'll just test for valid json.
      try {
        JSON.parse(json.value);
      } catch {
        return false;
      }

      return true;
    });

    const onCopy = () => {
      copy(json.value);
    }

    const onSubmit = () => {
      if (isValid.value) {
        emit('apply', json.value);
      }
    }
    
    return {
      isValid,
      json,
      onCopy,
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
    'apply',
    'dismiss',
  ],
  props: {
    pendingKeyboardConfig: {
      required: true,
      type: Object as PropType<KeyboardConfig>,
    },
  },
});
</script>
