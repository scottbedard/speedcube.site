<template>
  <Modal
    padded
    :visible="visible"
    @before-enter="reset">
    <form
      class="gap-6 grid xs:grid-cols-2"
      @submit.prevent="submit">
      <Input
        v-model="char"
        autofocus
        label="Key"
        maxlength="1"
        placeholder="Enter character"
        required />

      <Input
        v-model="turn"
        label="Turn"
        placeholder="Enter puzzle turn"
        required />

      <div class="flex flex-wrap gap-6 justify-end xs:col-span-2 xs:flex-nowrap">
        <div class="flex flex-1 items-center justify-center w-full xs:justify-start">
          <a
            v-if="activeBinding"
            class="flex items-center hover:text-red-500"
            href="#"
            @click.prevent="remove">
            <Icon
              class="mr-2"
              name="trash" />
            
            Remove binding
          </a>
        </div>

        <div class="flex flex-wrap gap-6 items-center justify-end w-full xs:w-auto">
          <div class="text-center w-full xs:w-auto">
            <a href="#" @click.prevent="close">
              Cancel
            </a>
          </div>

          <Button
            class="w-full xs:w-auto"
            primary
            type="submit">
            Save
          </Button>
        </div>
      </div>
    </form>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { Button, Icon, Input, Modal } from '@/components'

export default defineComponent({
  setup(props, { emit }) {
    const char = ref('')
    const turn = ref('')

    const close = () => emit('close')

    const remove = () => {
      emit('remove')
    }

    const reset = () => {
      char.value = props.activeBinding?.char ?? ''
      turn.value = props.activeBinding?.turn ?? ''
    }

    const submit = () => {
      emit('add', { char: char.value, turn: turn.value })
    }

    return {
      char,
      close,
      remove,
      reset,
      submit,
      turn,
    }
  },
  emits: [
    'add',
    'close',
    'remove',
  ],
  components: {
    Button,
    Icon,
    Input,
    Modal,
  },
  props: {
    activeBinding: Object as PropType<null | { char: string, turn: string }>,
    visible: Boolean,
  },
})
</script>
