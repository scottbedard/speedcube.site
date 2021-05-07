<template>
  <div class="gap-x-10 gap-y-3 flex flex-wrap justify-center mb-6">
    <a
      v-for="(link, index) in toolbar"
      class="flex items-center justify-center w-full sm:w-auto"
      href="#"
      :key="index"
      @click.prevent="link.onClick">
      <IconText :name="link.icon">
        {{ link.text }}
      </IconText>
    </a>
  </div>

  <div class="grid gap-6 max-w-6xl mx-auto">
    <div class="flex flex-wrap gap-x-6 gap-y-3 justify-center">
      <a
        v-for="(turn, char) in keyspaceBindings"
        class="bg-gray-50 flex gap-2 px-3 py-1 rounded-md shadow-md text-sm dark:bg-gray-700 hover:shadow-lg"
        href="#"
        :key="char"
        @click.prevent="editBinding({ char: String(char), turn })">
        <span v-text="char" />
        &bull;
        <span v-text="turn" />
      </a>
    </div>

    <div class="flex flex-wrap gap-6 items-center justify-between">
      <IconText name="alert-octagon">
        You must be signed in to save keyboard configuration.
      </IconText>

      <div class="flex flex-wrap gap-6 items-center justify-center w-full xs:justify-end lg:w-auto">
        <RouterLink
          :to="{
            name: 'login',
            query: {
              returnTo: route.fullPath,
            }
          }">
          Sign in
        </RouterLink>

        <Button
          class="w-full xs:w-auto"
          primary
          :to="{ name: 'create-account' }">
          Create account
        </Button>
      </div>
    </div>
  </div>

  <KeybindingModal
    :active-binding="activeBinding"
    :visible="keybindingModalIsVisible"
    @add="addBinding"
    @close="closeModals"
    @remove="removeActiveBinding" />

  <KeyspaceModal
    :visible="keyspaceModalIsVisible"
    @add="addKeyspace"
    @close="closeModals" />

  <JsonModal
    :visible="jsonModalIsVisible"
    @close="closeModals" />

  <ResetModal
    :visible="resetModalIsVisible"
    @close="closeModals" />

  <ClearAllModal
    :visible="clearAllModalIsVisible"
    @close="closeModals" />
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import { Button, IconText } from '@/components'
import { useKeyboard } from '@/components/puzzle/use-keyboard'
import { useKeyboardConfig } from '@/app/api'
import { useRoute } from 'vue-router'
import ClearAllModal from '@/partials/solve/ClearAllModal.vue'
import JsonModal from '@/partials/solve/JsonModal.vue'
import KeybindingModal from '@/partials/solve/KeybindingModal.vue'
import KeyspaceModal from '@/partials/solve/KeyspaceModal.vue'
import ResetModal from '@/partials/solve/ResetModal.vue'

type ToolbarItem = {
  icon: string
  onClick: () => void
  text: string
}

export default defineComponent({
  setup() {
    const route = useRoute()
    const puzzle = route.params?.puzzle as string

    const clearAllModalIsVisible = ref(false)
    const jsonModalIsVisible = ref(false)
    const keybindingModalIsVisible = ref(false)
    const keyspaceModalIsVisible = ref(false)
    const resetModalIsVisible = ref(false)

    const activeBinding = ref<{ char: string, turn: string } | null>(null)

    // model management
    const {
      config,
      loading,
      save,
    } = useKeyboardConfig(puzzle)

    // current keyboard
    const {
      keyspace,
      keyspaceBindings,
    } = useKeyboard(config)

    // add a key binding
    const addBinding = (binding: { char: string, turn: string }) => {
      removeActiveBinding()

      if (keyspace.value) {
        if (!config.value.keyspaces[keyspace.value]) {
          config.value.keyspaces[keyspace.value] = {}
        }

        config.value.keyspaces[keyspace.value][binding.char] = binding.turn
      } else {
        config.value.default[binding.char] = binding.turn
      }

      activeBinding.value = null
    }

    // add a keyspace
    const addKeyspace = (char: string) => {
      closeModals()
      
      keyspace.value = char
    }

    // close all modals
    const closeModals = () => {
      clearAllModalIsVisible.value = false
      jsonModalIsVisible.value = false
      keybindingModalIsVisible.value = false
      keyspaceModalIsVisible.value = false
      resetModalIsVisible.value = false
    }

    // edit a key binding
    const editBinding = (binding: { char: string, turn: string }) => {
      activeBinding.value = binding

      openModal(keybindingModalIsVisible)
    }


    // set a modal visibility ref to true
    const openModal = (isVisible: Ref<boolean>) => {
      closeModals()

      isVisible.value = true
    }

    // remove the active binding
    const removeActiveBinding = () => {
      closeModals()

      if (activeBinding.value) {
        if (keyspace.value) {
          delete config.value.keyspaces[activeBinding.value.char]
        } else {
          delete config.value.default[activeBinding.value.char]
        }
      }
    }

    // toolbar links
    const toolbar: ToolbarItem[] = [
      {
        icon: 'plus',
        text: 'Add key binding',
        onClick: () => {
          activeBinding.value = null

          openModal(keybindingModalIsVisible)
        },
      },
      {
        icon: 'chevron-up',
        text: 'Add keyspace',
        onClick: () => openModal(keyspaceModalIsVisible),
      },
      {
        icon: 'tool',
        text: 'Edit JSON',
        onClick: () => openModal(jsonModalIsVisible),
      },
      {
        icon: 'refresh-ccw',
        text: 'Reset default',
        onClick: () => openModal(resetModalIsVisible),
      },
      {
        icon: 'trash',
        text: 'Clear all',
        onClick: () => openModal(clearAllModalIsVisible)
      },
    ]

    return {
      activeBinding,
      addBinding,
      addKeyspace,
      clearAllModalIsVisible,
      closeModals,
      config,
      editBinding,
      jsonModalIsVisible,
      keybindingModalIsVisible,
      keyspaceBindings,
      keyspaceModalIsVisible,
      loading,
      removeActiveBinding,
      resetModalIsVisible,
      route,
      save,
      toolbar,
    }
  },
  components: {
    Button,
    ClearAllModal,
    IconText,
    JsonModal,
    KeybindingModal,
    KeyspaceModal,
    ResetModal,
  },
})
</script>
