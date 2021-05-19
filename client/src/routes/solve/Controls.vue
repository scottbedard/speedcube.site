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
    <div class="flex flex-wrap font-mono gap-4 justify-center">
      <button
        v-for="(turn, key) in previewKeyboardConfig"
        class="bg-gray-50 flex px-3 py-1 rounded shadow-md text-sm hover:bg-white dark:bg-gray-700 dark:hover:bg-gray-600"
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
import { Button, IconText } from '@/components'
import { defineComponent, onMounted, onUnmounted, Ref, ref } from 'vue'
import { isAuthenticated, keyboardConfig } from '@/app/store/computed'
import { Keybinding } from '@/app/types/puzzle'
import { previewKeyboardConfig } from '@/app/store/state'
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
    const route = useRoute()
    const router = useRouter()
    const puzzle = route.params?.puzzle as string

    const activeBinding = ref<Keybinding | null>(null)
    const clearAllModalIsVisible = ref(false)
    const jsonModalIsVisible = ref(false)
    const keybindingModalIsVisible = ref(false)
    const resetModalIsVisible = ref(false)

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

    // set a modal visibility ref to true
    const openModal = (isVisible: Ref<boolean>) => {
      closeModals()

      isVisible.value = true
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
        onClick: () => {
          activeBinding.value = null
          openModal(keybindingModalIsVisible)
        },
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
      isAuthenticated,
      jsonModalIsVisible,
      keybindingModalIsVisible,
      loading,
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
    ResetModal,
  },
})
</script>
