<template>
  <Modal padded :visible="visible">
    <form
      class="gap-6 grid xs:grid-cols-2"
      @submit.prevent="submit">
      <Input
        v-model="char"
        autofocus
        class
        label="Key"
        placeholder="Enter character"
        required />

      <Input
        v-model="turn"
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
          Save
        </Button>
      </div>
    </form>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Button, Input, Modal } from '@/components'

export default defineComponent({
  setup(props, { emit }) {
    const char = ref('')
    const turn = ref('')

    const close = () => emit('close')

    const submit = () => {
      emit('save', { char: char.value, turn: turn.value })
    }

    return {
      char,
      close,
      submit,
      turn,
    }
  },
  emits: [
    'save',
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
