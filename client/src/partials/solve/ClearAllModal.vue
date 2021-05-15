<template>
  <Modal
    padded
    :visible="visible"
    @close="close">
    <h3 class="font-bold mb-6 text-2xl">You're about to clear all key bindings</h3>

    <p class="mb-6">Doing this removes all key bindings. Your current setup could still be recovered by discarding changes, but any unsaved changes would be lost.</p>

    <ActionBar
      button-text="Clear all"
      button-theme="danger"
      primary-link-text="Cancel"
      @button-click="confirm"
      @primary-link-click="close" />
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ActionBar, Modal } from '@/components'

export default defineComponent({
  setup(props, { emit }) {
    const close = () => emit('close')

    const confirm = () => emit('confirm')

    return {
      close,
      confirm,
    }
  },
  emits: [
    'close',
    'confirm',
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
