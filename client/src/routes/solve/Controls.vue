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

  <KeybindingModal
    :visible="keybindingModalIsVisible"
    @close="closeModals" />

  <KeyspaceModal
    :visible="keyspaceModalIsVisible"
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
    const clearAllModalIsVisible = ref(false)
    const jsonModalIsVisible = ref(false)
    const keybindingModalIsVisible = ref(false)
    const keyspaceModalIsVisible = ref(false)
    const resetModalIsVisible = ref(false)

    const closeModals = () => {
      clearAllModalIsVisible.value = false
      jsonModalIsVisible.value = false
      keybindingModalIsVisible.value = false
      keyspaceModalIsVisible.value = false
      resetModalIsVisible.value = false
    }

    const openModal = (isVisible: Ref<boolean>) => {
      closeModals()
      isVisible.value = true
    }

    const toolbar: ToolbarItem[] = [
      {
        icon: 'plus',
        text: 'Add key binding',
        onClick: () => openModal(keybindingModalIsVisible),
      },
      {
        icon: 'command',
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
      clearAllModalIsVisible,
      closeModals,
      jsonModalIsVisible,
      keybindingModalIsVisible,
      keyspaceModalIsVisible,
      resetModalIsVisible,
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
