<template>
  <Modal
    padded
    :visible="visible"
    @before-enter="reset">
    <form
      class="gap-6 flex flex-wrap"
      @submit.prevent="submit">
      <div class="gap-6 grid w-full xs:grid-cols-2">
        <Input
          v-model="binding.key"
          autofocus
          label="Key"
          maxlength="1"
          placeholder="Enter character"
          required />

        <Input
          v-model="binding.turn"
          label="Turn"
          placeholder="Enter puzzle turn"
          required />
      </div>

      <ActionBar
        button-text="Save"
        button-type="submit"
        class="w-full"
        primary-link-text="Cancel"
        secondary-link-icon="trash"
        secondary-link-theme="danger"
        :secondary-link-text="activeBinding && 'Remove binding'"
        @primary-link-click="close"
        @secondary-link-click="remove" />
    </form>
  </Modal>
</template>

<script lang="ts">
import { ActionBar, Input, Modal } from '@/components'
import { defineComponent, PropType, reactive } from 'vue'
import { Keybinding } from '@/app/types/puzzle'

export default defineComponent({
  setup(props, { emit }) {
    const binding = reactive<Keybinding>({ key: '', turn: '' })

    const close = () => {
      emit('close')
    }

    const remove = () => {
      emit('remove')
    }

    const reset = () => {
      binding.key = props.activeBinding?.key ?? ''
      binding.turn = props.activeBinding?.turn ?? ''
    }

    const submit = () => {
      emit('add', binding)
    }

    return {
      binding,
      close,
      remove,
      reset,
      submit,
    }
  },
  emits: [
    'add',
    'close',
    'remove',
  ],
  components: {
    ActionBar,
    Input,
    Modal,
  },
  props: {
    activeBinding: {
      type: Object as PropType<Keybinding | null>,
    },
    visible: {
      required: true,
      type: Boolean,
    },
  },
})
</script>
