<template>
  <Modal padded :visible="visible">
    <h3 class="font-bold mb-6 text-2xl">You're about to clear all key bindings</h3>

    <p class="mb-6">Doing this removes all key bindings and keyspaces. Your current setup could still be recovered by discarding changes, but any unsaved changes would be lost.</p>

    <div class="flex flex-wrap gap-6 items-center justify-end">
      <a
        class="text-center w-full xs:w-auto"
        href="#"
        @click.prevent="close">
        Cancel
      </a>

      <Button
        class="w-full xs:w-auto"
        danger
        @click="confirm">
        Clear all
      </Button>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Button, Modal } from '@/components'

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
    Button,
    Modal,
  },
  props: {
    visible: Boolean,
  },
})
</script>
