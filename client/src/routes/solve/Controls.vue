<template>
  <div class="gap-x-10 gap-y-3 flex flex-wrap justify-center">
    <a
      v-for="(link, index) in toolbar"
      class="flex items-center justify-center w-full sm:w-auto"
      href="#"
      :key="index"
      @click.prevent="link.onClick">
      <Icon
        class="mr-2"
        :name="link.icon" />
      
      {{ link.text }}
    </a>
  </div>

  <div class="flex flex-wrap">

  </div>

  <pre>{{ config }}</pre>

  <KeybindingModal
    :visible="keybindingModalIsVisible"
    @add="addKeybinding"
    @close="closeModals" />

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
import { Icon } from '@/components'
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

    // model management
    const {
      config,
      loading,
      save,
    } = useKeyboardConfig(puzzle)

    // current keyboard
    const {
      keyspace,
    } = useKeyboard(config)

    // add a keybinding
    const addKeybinding = (binding: { char: string, turn: string }) => {
      closeModals()

      if (keyspace.value) {
        if (!config.value.keyspaces[keyspace.value]) {
          config.value.keyspaces[keyspace.value] = {}
        }

        config.value.keyspaces[keyspace.value][binding.char] = binding.turn
      } else {
        config.value.default[binding.char] = binding.turn
      }
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

    // set a modal visibility ref to true
    const openModal = (isVisible: Ref<boolean>) => {
      closeModals()

      isVisible.value = true
    }

    // toolbar links
    const toolbar: ToolbarItem[] = [
      {
        icon: 'plus',
        text: 'Add key binding',
        onClick: () => openModal(keybindingModalIsVisible),
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
      addKeybinding,
      addKeyspace,
      clearAllModalIsVisible,
      closeModals,
      config,
      jsonModalIsVisible,
      keybindingModalIsVisible,
      keyspaceModalIsVisible,
      loading,
      resetModalIsVisible,
      save,
      toolbar,
    }
  },
  components: {
    ClearAllModal,
    Icon,
    JsonModal,
    KeybindingModal,
    KeyspaceModal,
    ResetModal,
  },
})
</script>
