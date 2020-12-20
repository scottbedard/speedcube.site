<template>
  <!-- modals -->
  <v-keybinding-modal
    v-if="isActiveModal('keybinding')"
    :initial-value="editingBinding"
    @add="addBinding"
    @dismiss="closeModal"
    @remove="removeBinding" />

  <div class="gap-6 grid">
    <!-- info -->
    <p class="leading-loose max-w-xl mx-auto text-center">
      These are your current key bindings, displayed in <span class="inline-flex items-center">
      &quot;key &bull; turn&quot;</span> format. Pressing a key will highlight the associated binding.
    </p>

    <!-- actions -->
    <div class="gap-x-8 gap-y-6 flex flex-wrap justify-center tracking-wide xl:gap-x-12">
      <a class="inline-flex items-center" href="#" @click.prevent="showAddModal">
        <v-icon class="mr-3" name="plus" size="5" stroke="3" /> Add Binding
      </a>
      <a class="inline-flex items-center" href="#" @click.prevent>
        <v-icon class="mr-3" name="hash" size="5" stroke="3" /> Add Keyspace
      </a>
      <a class="inline-flex items-center" href="#" @click.prevent>
        <v-icon class="mr-3" name="code" size="5" stroke="3" /> Edit JSON
      </a>
      <a class="inline-flex items-center" href="#" @click.prevent>
        <v-icon class="mr-3" name="rotate-ccw" size="5" stroke="3" /> Reset Default
      </a>
      <a class="inline-flex items-center" href="#" @click.prevent>
        <v-icon class="mr-3" name="trash-2" size="5" stroke="2" /> Clear All
      </a>
    </div>

    <!-- active keyspace -->
    <div class="py-6">
      <v-active-keyspace
        :active-keyspace="activeKeyspace"
        :pending-keyboard-config="pendingKeyboardConfig"
        @edit="showEditModal" />
    </div>

    <!-- footer -->
    <div class="flex gap-8 items-center justify-center">
      <v-button>Save</v-button>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { cloneDeep } from 'lodash-es';
import { defineComponent, onUnmounted, ref } from 'vue';
import { keyboardConfig } from '@/app/store/user/getters';
import { pendingKeyboardConfig } from '../state';
import { usePuzzleName } from '../behaviors';
import VActiveKeyspace from '@/partials/solve/active-keyspace.vue';
import VKeybindingModal from '@/partials/solve/keybinding-modal.vue';
import VButton from '@/components/button.vue';
import VIcon from '@/components/icon.vue';

type Keybinding = { key: string, turn: string };

export default defineComponent({
  setup() {
    const activeKeyspace = ref('');
    const activeModal = ref('');
    const editingBinding = ref<Keybinding | null>(null);
    const puzzleName = usePuzzleName();

    // modal visibility
    const closeModal = () => {
      activeModal.value = '';
    }

    const isActiveModal = (value: string) => activeModal.value === value;

    const showAddModal = () => {
      editingBinding.value = null;
      showModal('keybinding');
    }

    const showEditModal = (keybinding: Keybinding) => {
      editingBinding.value = keybinding;
      showModal('keybinding');
    }

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

    // remove a key binding
    const removeBinding = (key: string) => {
      if (pendingKeyboardConfig.value) {
        if (!activeKeyspace.value) {
          delete pendingKeyboardConfig.value.default[key];
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
      editingBinding,
      isActiveModal,
      pendingKeyboardConfig,
      removeBinding,
      showAddModal,
      showEditModal,
    };
  },
  components: {
    VActiveKeyspace,
    VKeybindingModal,
    VButton,
    VIcon,
  },
});
</script>
