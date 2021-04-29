<template>
  <Modal padded>
    <h3>Clear all bindings</h3>

    <div class="flex flex-wrap gap-6 items-center justify-end">
      <a
        class="text-center w-full xs:w-auto"
        href="#"
        @click.prevent="close">
        Cancel
      </a>

      <Button
        class="w-full xs:w-auto"
        primary>
        Add
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

    return {
      close
    }
  },
  emits: [
    'close',
  ],
  components: {
    Button,
    Modal,
  },
})
</script>
