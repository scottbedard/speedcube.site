<template>
  <Modal padded :visible="visible">
    <h3>Reset default bindings</h3>

    <ActionBar
      button-text="Reset"
      button-theme="danger"
      primary-link-text="Cancel"
      @primary-link-click="close" />
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ActionBar, Modal } from '@/components'

export default defineComponent({
  setup(props, { emit }) {
    const close = () => {
      emit('close')
    }

    return {
      close
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
