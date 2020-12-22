<template>
  <div class="gap-6 grid">
    <div
      v-if="pendingKeyspaces.length > 1"
      class="font-mono gap-6 flex flex-wrap items-center justify-center text-sm">
      <a
        v-for="keyspace in pendingKeyspaces"
        class="rounded shadow text-gray-200 px-2 py-1 hover:text-white"
        href="#"
        :class="[keyspaceColors(keyspace)]"
        :key="keyspace"
        @click.prevent="$emit('click-add-keyspace', keyspace === 'default' ? '' : keyspace)">
        {{ keyspace }}
      </a>
      <a
        v-if="activeKeyspace"
        class="flex font-sans items-center tracking-wide hover:text-red-500"
        href="#"
        @click.prevent="$emit('click-delete-keyspace', activeKeyspace)">
        <v-icon
          class="mr-2"
          name="trash-2"
          size="4" />
        Delete Keyspace
      </a>
    </div>
    <div class="gap-6 flex flex-wrap justify-center">
      <p
        v-if="keybindings.length === 0"
        class="py-6 text-center">
        {{ activeKeyspace ? 'This keyspace' : 'The default keyspace'}} is empty
      </p>
      <a
        v-for="[key, turn] in keybindings"
        class="bg-gray-700 font-mono rounded shadow text-gray-200 text-sm px-2 py-1 hover:bg-gray-600 hover:text-white"
        href="#"
        :key="key"
        @click.prevent="$emit('edit', { key, turn })">
        {{ key }} &bull; {{ turn }}
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { KeyboardConfig } from '@/types/puzzle';
import VIcon from '@/components/icon.vue';

export default defineComponent({
  setup(props) {
    const keyspaceColors = (keyspace: string) => {
      return keyspace === props.activeKeyspace || (keyspace === 'default' && !props.activeKeyspace)
        ? 'bg-purple-700 hover:bg-purple-600'
        : 'bg-blue-700 hover:bg-blue-600'
    }

    const keybindings = computed(() => {
      return props.activeKeyspace
        ? Object.entries(props.pendingKeyboardConfig.keyspaces[props.activeKeyspace] ?? {})
        : Object.entries(props.pendingKeyboardConfig.default ?? {});
    });

    return {
      keybindings,
      keyspaceColors,
    };
  },
  components: {
    VIcon,
  },
  emits: [
    'click-add-keyspace',
    'click-delete-keyspace',
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
    pendingKeyspaces: {
      required: true,
      type: Array as PropType<string[]>,
    },
  },
});
</script>
