<template>
  <p
    v-if="keybindings.length === 0"
    class="text-center text-gray-600 tracking-wide">
    Keyspace is empty
  </p>

  <div v-else class="flex flex-wrap font-mono gap-6 justify-center">
    <a
      v-for="[key, turn] in keybindings"
      class="bg-gray-800 rounded shadow-xl text-gray-300 px-3 py-1"
      href="#"
      :key="key"
      @click.prevent="$emit('edit', { key, turn })">
      {{ key }} &bull; {{ turn }}
    </a>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { KeyboardConfig } from '@/types/puzzle';

export default defineComponent({
  setup(props) {
    const keybindings = computed(() => {
      return Object.entries(
        props.activeKeyspace
          ? {}
          : props.pendingKeyboardConfig.default,
      );
    });

    return {
      keybindings,
    };
  },
  emits: [
    'edit',
  ],
  props: {
    activeKeyspace: {
      required: true,
      type: String,
    },
    pendingKeyboardConfig: {
      required: true,
      type: Object as PropType<KeyboardConfig>,
    },
  },
});
</script>
