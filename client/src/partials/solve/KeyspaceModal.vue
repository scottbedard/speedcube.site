<template>
  <Modal
    padded
    :visible="visible"
    @before-enter="reset">
    <form
      class="gap-6 grid"
      @submit.prevent="submit">
      <Input
        v-model="char"
        autofocus
        class
        label="Keyspace"
        maxlength="1"
        placeholder="Enter keyspace character"
        required />

      <p>
        Keyspaces enable multiple keyboard layouts. To change keyspaces while solving, press control and the assigned character.
      </p>

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
    </form>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Button, Input, Modal } from '@/components'

export default defineComponent({
  setup(props, { emit }) {
    const char = ref('')

    const close = () => emit('close')

    const reset = () => {
      char.value = ''
    }

    const submit = () => {
      emit('add', char.value)
    }

    return {
      char,
      close,
      reset,
      submit,
    }
  },
  emits: [
    'add',
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
