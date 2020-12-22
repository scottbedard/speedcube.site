<template>
  <!-- modals -->
  <v-keybinding-modal
    v-if="isActiveModal('keybinding')"
    :initial-value="editingBinding"
    @add="addBinding"
    @dismiss="closeModal"
    @remove="removeBinding" />

  <v-keyspace-modal
    v-else-if="isActiveModal('keyspace')"
    :active-keyspace="activeKeyspace"
    @add="addKeyspace"
    @dismiss="closeModal"
    @remove="removeKeyspace" />

  <v-edit-json-modal
    v-else-if="isActiveModal('edit-json')"
    :pending-keyboard-config="pendingKeyboardConfig"
    @apply="applyJson"
    @dismiss="closeModal" />

  <v-reset-default-modal
    v-else-if="isActiveModal('reset-default')"
    @dismiss="closeModal"
    @confirm="resetDefault" />

  <v-clear-all-modal
    v-else-if="isActiveModal('clear-all')"
    @dismiss="closeModal"
    @confirm="clearAll" />

  <div class="gap-6 grid">
    <!-- actions -->
    <div class="gap-x-12 gap-y-6 flex flex-wrap justify-center tracking-wide">
      <a class="inline-flex items-center" href="#" @click.prevent="showAddModal">
        <v-icon class="mr-3" name="plus" size="5" stroke="3" /> Add Key Binding
      </a>
      <a class="inline-flex items-center" href="#" @click.prevent="showModal('keyspace')">
        <v-icon class="mr-3" name="chevron-up" size="5" stroke="3" /> Add Keyspace
      </a>
      <a class="inline-flex items-center" href="#" @click.prevent="showModal('edit-json')">
        <v-icon class="mr-3" name="tool" size="5" stroke="2" /> Edit JSON
      </a>
      <a class="inline-flex items-center" href="#" @click.prevent="showModal('reset-default')">
        <v-icon class="mr-3" name="rotate-ccw" size="5" stroke="3" /> Reset Default
      </a>
      <a class="inline-flex items-center" href="#" @click.prevent="showModal('clear-all')">
        <v-icon class="mr-3" name="trash-2" size="5" stroke="2" /> Clear All
      </a>
    </div>

    <!-- keyspaces -->
    <div class="py-6">
      <v-active-keyspace
        :active-keyspace="activeKeyspace"
        :pending-keyboard-config="pendingKeyboardConfig"
        :pending-keyspaces="pendingKeyspaces"
        @click-add-keyspace="onKeyspaceClick"
        @click-delete-keyspace="deleteActiveKeyspace"
        @edit="showEditModal" />
    </div>

    <!-- footer -->
    <div v-if="isAuthenticated" class="flex gap-x-12 items-center justify-end">
      <router-link
        class="flex items-center"
        :to="{ name: 'solve' }">
        Cancel
      </router-link>
      <v-button
        :loading="isLoading"
        @click="onSave">
        Save
      </v-button>
    </div>

    <!-- guest message -->
    <div v-else class="flex justify-end">
      <p>
        Please <router-link :to="{ name: 'login' }">sign in</router-link> or
        <router-link :to="{ name: 'signup' }">create an account</router-link>
        to save
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { cloneDeep } from 'lodash-es';
import { computed, defineComponent, onUnmounted, ref } from 'vue';
import { cubeKeyboardConfig, createFreshKeyboardConfig, dodecaminxKeyboardConfig, isCube, isDodecaminx } from '@/app/utils/puzzle';
import { fireAlert } from '@/app/store/alert/actions';
import { isAuthenticated } from '@/app/store/user/getters';
import { keyboardConfig } from '@/app/store/user/getters';
import { pendingKeyboardConfig } from '../state';
import { saveKeyboardConfig } from '@/app/store/user/actions';
import { usePuzzleId, usePuzzleName } from '../behaviors';
import { useRouter } from 'vue-router';
import VActiveKeyspace from '@/partials/solve/active-keyspace.vue';
import VButton from '@/components/button.vue';
import VClearAllModal from '@/partials/solve/clear-all-modal.vue';
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
    const isLoading = ref(false);
    const puzzleId = usePuzzleId();
    const puzzleName = usePuzzleName();
    const router = useRouter();

    // clear all bindings
    const clearAll = () => {
      pendingKeyboardConfig.value = createFreshKeyboardConfig();

      closeModal();
    }

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
        isLoading.value = true;

        await saveKeyboardConfig(puzzleId.value, pendingKeyboardConfig.value);

        isLoading.value = false;

        router.push({ name: 'solve' });

        fireAlert({
          duration: 3000,
          message: 'Key bindings saved',
        });
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
      clearAll,
      closeModal,
      deleteActiveKeyspace,
      editingBinding,
      isActiveModal,
      isAuthenticated,
      isLoading,
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
    VClearAllModal,
    VEditJsonModal,
    VIcon,
    VKeybindingModal,
    VKeyspaceModal,
    VResetDefaultModal,
  },
});
</script>
