<template>
  <Modal
    padded
    :visible="visible"
    @close="close">
    <h3 class="font-bold text-2xl">You're about to reset all custom bindings</h3>

    <p class="my-6">
      Doing this resets all key bindings to their default state. You could still recover your current setup by discarding changes, but any unsaved changes would be lost.
    </p>

    <ActionBar
      button-text="Reset"
      button-theme="danger"
      primary-link-text="Cancel"
      @button-click="reset"
      @primary-link-click="close" />
  </Modal>
</template>

<script lang="ts">
import { ActionBar, Modal } from '@/components'
import { defaultKeyboardConfig } from '@/app/utils'
import { defineComponent } from 'vue'
import { previewKeyboardConfig } from '@/app/store/state'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup(props, { emit }) {
    const route = useRoute()

    const close = () => {
      emit('close')
    }

    const reset = () => {
      previewKeyboardConfig.value = defaultKeyboardConfig(route.params.puzzle as string)

      close()
    }

    return {
      close,
      reset,
    }
  },
  emits: [
    'close',
  ],
  components: {
    ActionBar,
    Modal,
  },
  props: {
    visible: Boolean,
  },
})
</script>
