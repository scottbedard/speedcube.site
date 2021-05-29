<template>
  <div class="grid gap-12 max-w-6xl mx-auto">
    <div class="gap-x-12 gap-y-3 flex flex-wrap justify-center">
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

    <p
      v-if="empty"
      class="text-center">
      No key bindings are configured, <a href="#" @click.prevent="openAddModal">click here to get started</a>.
    </p>
    
    <div
      v-else
      class="flex flex-wrap font-mono gap-4 justify-center">
      <button
        v-for="(turn, key) in previewKeyboardConfig"
        class="flex px-3 py-1 rounded shadow-md text-sm"
        :class="[
          isHighlighted(key)
            ? 'bg-blue-500 text-white'
            : 'bg-gray-50 hover:bg-white dark:bg-gray-700 dark:hover:bg-gray-600'
        ]"
        :key="key"
        @click="editBinding(key)">
        {{ key }} &bull; {{ turn }}
      </button>
    </div>

    <div
      v-if="isAuthenticated"
      class="flex flex-wrap gap-6 items-center justify-center xs:justify-end">
      <RouterLink
        :to="{
          name: 'solve',
          params: {
            puzzle: route.params.puzzle,
          },
        }">
        Cancel
      </RouterLink>

      <Button
        class="w-full xs:w-auto"
        primary
        :disabled="loading"
        :loading="loading"
        @click="submit">
        Save
      </Button>
    </div>

    <div
      v-else
      class="flex flex-wrap gap-6 items-center justify-between">
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
          Login
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

  <Keyboard
    :config="previewKeyboardConfig"
    @turn="highlight" />

  <KeybindingModal
    :active-binding="activeBinding"
    :visible="keybindingModalIsVisible"
    @add="setBinding"
    @close="closeModals"
    @remove="removeActiveBinding" />

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
import { alert } from '@/app/alerts'
import { Button, IconText, Keyboard } from '@/components'
import { computed, defineComponent, onMounted, onUnmounted, Ref, ref } from 'vue'
import { isAuthenticated, keyboardConfig } from '@/app/store/computed'
import { Keybinding } from '@/app/types/puzzle'
import { previewKeyboardConfig } from '@/app/store/state'
import { useComponentTimeout } from '@/app/behaviors'
import { useKeyboardConfig } from '@/app/api'
import { useRoute, useRouter } from 'vue-router'
import ClearAllModal from '@/partials/solve/ClearAllModal.vue'
import JsonModal from '@/partials/solve/JsonModal.vue'
import KeybindingModal from '@/partials/solve/KeybindingModal.vue'
import ResetModal from '@/partials/solve/ResetModal.vue'

type ToolbarItem = {
  icon: string
  onClick: () => void
  text: string
}

export default defineComponent({
  setup() {
    const { setComponentTimeout } = useComponentTimeout()

    const route = useRoute()
    const router = useRouter()
    const puzzle = route.params?.puzzle as string

    const activeBinding = ref<Keybinding | null>(null)
    const clearAllModalIsVisible = ref(false)
    const highlightedBindings = ref<Keybinding[]>([])
    const jsonModalIsVisible = ref(false)
    const keybindingModalIsVisible = ref(false)
    const resetModalIsVisible = ref(false)

    const empty = computed(() => {
      return !previewKeyboardConfig.value || Object.keys(previewKeyboardConfig.value).length === 0
    })

    // test if a key is highlighted
    const isHighlighted = computed(() => {
      return (key: string) => highlightedBindings.value.some(keybinding => keybinding.key === key)
    })

    // model management
    const {
      loading,
      save,
    } = useKeyboardConfig(puzzle)

    // close all modals
    const closeModals = () => {
      clearAllModalIsVisible.value = false
      jsonModalIsVisible.value = false
      keybindingModalIsVisible.value = false
      resetModalIsVisible.value = false
    }

    // show edit binding modal
    const editBinding = (key: string) => {
      activeBinding.value = {
        key,
        turn: previewKeyboardConfig.value?.[key] ?? '',
      }

      openModal(keybindingModalIsVisible)
    }

    // temporarily highlight a keybinding
    const highlight = (keybinding: Keybinding) => {
      highlightedBindings.value.push(keybinding)

      setComponentTimeout(() => {
        const index = highlightedBindings.value.indexOf(keybinding)

        if (index > -1) {
          highlightedBindings.value.splice(index, 1)
        }
      }, 200)
    }

    // set a modal visibility ref to true
    const openModal = (isVisible: Ref<boolean>) => {
      closeModals()

      isVisible.value = true
    }

    // open the add binding modal
    const openAddModal = () => {
      activeBinding.value = null

      openModal(keybindingModalIsVisible)
    }

    // remove the active binding
    const removeActiveBinding = () => {
      closeModals()

      if (!previewKeyboardConfig.value || !activeBinding.value?.key) {
        return
      }

      delete previewKeyboardConfig.value[activeBinding.value.key]
    }

    // set a key binding
    const setBinding = (binding: Keybinding) => {
      closeModals()
      
      if (!previewKeyboardConfig.value) {
        return
      }

      previewKeyboardConfig.value[binding.key] = binding.turn

      activeBinding.value = null
    }

    // save keyboard config
    const submit = () => {
      save().then(() => {
        // success
        alert({
          text: 'Keyboard configuration saved',
          type: 'success',
        })

        router.push({
          name: 'solve',
          params: { puzzle },
        })
      }, () => {
        // failed
        alert({
          text: 'An unknown error occured, please try again',
          type: 'failed',
        })
      })
    }

    // toolbar links
    const toolbar: ToolbarItem[] = [
      {
        icon: 'plus',
        text: 'Add key binding',
        onClick: openAddModal,
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

    // mounted
    onMounted(() => {
      const config = keyboardConfig.value(puzzle)
      
      previewKeyboardConfig.value = config
    })

    // unmounted
    onUnmounted(() => {
      previewKeyboardConfig.value = null
    })

    return {
      activeBinding,
      clearAllModalIsVisible,
      closeModals,
      editBinding,
      empty,
      highlight,
      highlightedBindings,
      isAuthenticated,
      isHighlighted,
      jsonModalIsVisible,
      keybindingModalIsVisible,
      loading,
      openAddModal,
      previewKeyboardConfig,
      removeActiveBinding,
      resetModalIsVisible,
      route,
      setBinding,
      submit,
      toolbar,
    }
  },
  components: {
    Button,
    ClearAllModal,
    IconText,
    JsonModal,
    KeybindingModal,
    Keyboard,
    ResetModal,
  },
})
</script>
