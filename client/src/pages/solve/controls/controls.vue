<template>
  <!-- modals -->
  <v-keybinding-modal
    v-if="isActiveModal('keybinding')"
    :initial-value="editingBinding"
    @add="addBinding"
    @dismiss="closeModal"
    @remove="removeBinding" />

  <v-keyspace-modal
    v-if="isActiveModal('keyspace')"
    :active-keyspace="activeKeyspace"
    @add="addKeyspace"
    @dismiss="closeModal"
    @remove="removeKeyspace" />

  <v-edit-json-modal
    v-if="isActiveModal('edit-json')"
    :pending-keyboard-config="pendingKeyboardConfig"
    @apply="applyJson"
    @dismiss="closeModal" />

  <v-reset-default-modal
    v-if="isActiveModal('reset-default')"
    @dismiss="closeModal"
    @reset="resetDefault" />

  <div class="gap-6 grid">
    <!-- info -->
    <!-- <p class="max-w-xl mx-auto text-center">
      These are your current key bindings, displayed in <span class="inline-flex items-center">
      &quot;key &bull; turn&quot;</span> format. Pressing a key will highlight the associated binding.
    </p> -->

    <!-- actions -->
    <div class="gap-x-8 gap-y-6 flex flex-wrap justify-center tracking-wide xl:gap-x-12">
      <a class="inline-flex items-center" href="#" @click.prevent="showAddModal">
        <v-icon class="mr-3" name="plus" size="5" stroke="3" /> Add Binding
      </a>
      <a class="inline-flex items-center" href="#" @click.prevent="showModal('keyspace')">
        <v-icon class="mr-3" name="hash" size="5" stroke="3" /> Add Keyspace
      </a>
      <a class="inline-flex items-center" href="#" @click.prevent="showModal('edit-json')">
        <v-icon class="mr-3" name="code" size="5" stroke="3" /> Edit JSON
      </a>
      <a class="inline-flex items-center" href="#" @click.prevent="showModal('reset-default')">
        <v-icon class="mr-3" name="rotate-ccw" size="5" stroke="3" /> Reset Default
      </a>
      <a class="inline-flex items-center" href="#" @click.prevent>
        <v-icon class="mr-3" name="trash-2" size="5" stroke="2" /> Clear All
      </a>
    </div>

    <!-- keyspaces -->
    <div class="py-6">
      <v-active-keyspace
        :active-keyspace="activeKeyspace"
        :pending-keyboard-config="pendingKeyboardConfig"
        :pending-keyspaces="pendingKeyspaces"
        @click-keyspace="onKeyspaceClick"
        @edit="showEditModal" />
    </div>

    <!-- footer -->
    <div class="flex gap-8 items-center justify-between">
      <div>
        <a
          v-if="activeKeyspace"
          class="flex items-center hover:text-red-500"
          href="#"
          @click.prevent="deleteActiveKeyspace">
          <v-icon class="mr-2" name="trash-2" size="5" /> Delete keyspace
        </a>
      </div>
      <v-button @click="onSave">Save</v-button>
    </div>
  </div>
</template>

<script lang="ts">
import { cloneDeep } from 'lodash-es';
import { computed, defineComponent, onUnmounted, ref } from 'vue';
import { cubeKeyboardConfig, dodecaminxKeyboardConfig, isCube, isDodecaminx } from '@/app/utils/puzzle';
import { keyboardConfig } from '@/app/store/user/getters';
import { pendingKeyboardConfig } from '../state';
import { saveKeyboardConfig } from '@/app/store/user/actions';
import { usePuzzleId, usePuzzleName } from '../behaviors';
import VActiveKeyspace from '@/partials/solve/active-keyspace.vue';
import VButton from '@/components/button.vue';
import VEditJsonModal from '@/partials/solve/edit-json-modal.vue';
import VIcon from '@/components/icon.vue';
import VKeybindingModal from '@/partials/solve/keybinding-modal.vue';
import VKeyspaceModal from '@/partials/solve/keyspace-modal.vue';
import VResetDefaultModal from '@/partials/solve/reset-default-modal.vue';

type Keybinding = { key: string, turn: string };

export default defineComponent({
  setup() {
    const activeKeyspace = ref('');
    const activeModal = ref('');
    const editingBinding = ref<Keybinding | null>(null);
    const puzzleId = usePuzzleId();
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

    // add key binding
    const addBinding = ({ key, turn }: { key: string, turn: string }) => {
      if (pendingKeyboardConfig.value) {
        if (activeKeyspace.value) {
          pendingKeyboardConfig.value.keyspaces[activeKeyspace.value][key] = turn;
        } else {
          pendingKeyboardConfig.value.default[key] = turn;
        }
      }

      closeModal();
    }

    // add keyspace
    const addKeyspace = (key: string) => {
      if (pendingKeyboardConfig.value) {
        const char = key.trim();
        activeKeyspace.value = char;
        pendingKeyboardConfig.value.keyspaces[char] = pendingKeyboardConfig.value.keyspaces[char] || {}
      }

      closeModal();
    }

    // apply json
    const applyJson = (json: string) => {
      pendingKeyboardConfig.value = JSON.parse(json);

      closeModal();
    }

    // delete the active keyspace
    const deleteActiveKeyspace = () => {
      if (pendingKeyboardConfig.value) {
        if (activeKeyspace.value) {
          delete pendingKeyboardConfig.value.keyspaces[activeKeyspace.value]
        }
      }

      setKeyspace('');
    }

    // handle a keyspace click
    const onKeyspaceClick = (keyspace: string) => {
      setKeyspace(keyspace);
    }

    // remove a key binding
    const removeBinding = (key: string) => {
      if (pendingKeyboardConfig.value) {
        if (activeKeyspace.value) {
          if (pendingKeyboardConfig.value.keyspaces[activeKeyspace.value]) {
            delete pendingKeyboardConfig.value.keyspaces[activeKeyspace.value][key];
          }
        } else {
          delete pendingKeyboardConfig.value.default[key];
        }
      }

      closeModal();
    }

    // remove a keyspace
    const removeKeyspace = (keyspace: string) => {
      if (pendingKeyboardConfig.value) {
        delete pendingKeyboardConfig.value.keyspaces[keyspace];
      }

      activeKeyspace.value = '';

      closeModal();
    }

    // reset default config
    const resetDefault = () => {
      if (isCube(puzzleName.value)) {
        pendingKeyboardConfig.value = cloneDeep(cubeKeyboardConfig);
      } else if (isDodecaminx(puzzleName.value)) {
        pendingKeyboardConfig.value = cloneDeep(dodecaminxKeyboardConfig);
      }
      
      closeModal();
    }

    // set the active keyspace
    const setKeyspace = (keyspace: string) => {
      activeKeyspace.value = keyspace;
    }

    // set pending keyboard config to equal the current config
    pendingKeyboardConfig.value = cloneDeep(keyboardConfig.value(puzzleName.value));

    // pending keyspaces
    const pendingKeyspaces = computed(() => ['default', ...Object.keys(pendingKeyboardConfig.value?.keyspaces ?? {})]);

    // save keyboard config for this puzzle
    const onSave = async () => {
      if (pendingKeyboardConfig.value) {
        await saveKeyboardConfig(puzzleId.value, pendingKeyboardConfig.value);
        
        // @todo: fire alert
      }
    }

    // flush pending keyboard config when the editor is closed
    onUnmounted(() => {
      pendingKeyboardConfig.value = null;
    });

    return {
      activeKeyspace,
      addBinding,
      addKeyspace,
      applyJson,
      closeModal,
      deleteActiveKeyspace,
      editingBinding,
      isActiveModal,
      onKeyspaceClick,
      onSave,
      pendingKeyboardConfig,
      pendingKeyspaces,
      removeBinding,
      removeKeyspace,
      resetDefault,
      showAddModal,
      showEditModal,
      showModal,
    };
  },
  components: {
    VActiveKeyspace,
    VButton,
    VEditJsonModal,
    VIcon,
    VKeybindingModal,
    VKeyspaceModal,
    VResetDefaultModal,
  },
});
</script>
