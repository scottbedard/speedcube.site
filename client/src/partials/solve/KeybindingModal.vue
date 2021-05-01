<template>
  <Modal padded :visible="visible">
    <form
      class="gap-6 grid xs:grid-cols-2"
      @submit.prevent="submit">
      <Input
        autofocus
        class
        label="Key"
        placeholder="Enter character"
        required />

      <Input
        label="Turn"
        placeholder="Enter puzzle turn"
        required />

      <div class="flex flex-wrap gap-6 items-center justify-end xs:col-span-2">
        <a
          class="text-center w-full xs:w-auto"
          href="#"
          @click.prevent="close">
          Cancel
        </a>

        <Button
          class="w-full xs:w-auto"
          primary
          type="submit">
          Add
        </Button>
      </div>
    </form>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Button, Input, Modal } from '@/components'

export default defineComponent({
  setup(props, { emit }) {
    const close = () => emit('close')

    const submit = () => {
      console.log('submit')
    }

    return {
      close,
      submit,
    }
  },
  emits: [
    'close',
  ],
  components: {
    Button,
    Input,
    Modal,
  },
  props: {
    visible: Boolean,
  },
})
</script>
