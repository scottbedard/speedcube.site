<template>
  <!-- info -->
  <p class="leading-loose max-w-xl mb-6 mx-auto text-center">
    These are your current key bindings, displayed in <strong class="inline-flex items-center">
    &quot;key &bull; turn&quot;</strong> format. Pressing a key will highlight the associated binding.
  </p>

  <!-- actions -->
  <div class="gap-x-12 flex flex-wrap justify-center leading-loose tracking-wide sm:justify-start">
    <a class="inline-flex items-center" href="#" @click.prevent="showModal('add')">
      <v-icon class="mr-2" name="plus" size="5" stroke="4" /> Add Binding
    </a>
    <a class="inline-flex items-center" href="#" @click.prevent>
      <v-icon class="mr-2" name="hash" size="5" stroke="3" /> Add Keyspace
    </a>
    <a class="inline-flex items-center" href="#" @click.prevent>
      <v-icon class="mr-2" name="code" size="5" stroke="3" /> Edit JSON
    </a>
    <a class="inline-flex items-center" href="#" @click.prevent>
      <v-icon class="mr-2" name="rotate-ccw" size="5" stroke="3" /> Reset Default
    </a>
    <a class="inline-flex items-center" href="#" @click.prevent>
      <v-icon class="mr-2" name="trash-2" size="5" stroke="3" /> Clear All
    </a>
  </div>

  <!-- modals -->
  <v-add-keybinding-modal
    v-if="isActiveModal('add')"
    @add="addBinding"
    @dismiss="closeModal" />

  <!-- keyspace -->
  <div>
    <pre>{{ { pendingKeyboardConfig } }}</pre>
  </div>

  <!-- footer -->
  <div class="flex justify-end">
    <v-button disabled>Save</v-button>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { cloneDeep } from 'lodash-es';
import { defineComponent, onUnmounted, ref } from 'vue';
import { keyboardConfig } from '@/app/store/user/getters';
import { pendingKeyboardConfig } from '../state';
import { usePuzzleName } from '../behaviors';
import VAddKeybindingModal from '@/partials/solve/add-keybinding-modal.vue';
import VButton from '@/components/button.vue';
import VIcon from '@/components/icon.vue';

export default defineComponent({
  setup() {
    const activeKeyspace = ref('');
    const activeModal = ref('');
    const puzzleName = usePuzzleName();

    // modal visibility
    const closeModal = () => {
      activeModal.value = '';
    }

    const isActiveModal = (value: string) => activeModal.value === value;

    const showModal = (value: string) => {
      activeModal.value = value;
    }

    // add a key binding
    const addBinding = ({ key, turn }: { key: string, turn: string }) => {
      if (pendingKeyboardConfig.value) {
        if (!activeKeyspace.value) {
          pendingKeyboardConfig.value.default[key] = turn;
        }
      }

      closeModal();
    }

    // set pending keyboard config to equal the current config
    pendingKeyboardConfig.value = cloneDeep(keyboardConfig.value(puzzleName.value));

    // flush pending keyboard config when the editor is closed
    onUnmounted(() => {
      pendingKeyboardConfig.value = null;
    });

    return {
      activeKeyspace,
      addBinding,
      closeModal,
      isActiveModal,
      pendingKeyboardConfig,
      showModal,
    };
  },
  components: {
    VAddKeybindingModal,
    VButton,
    VIcon,
  },
});
</script>
