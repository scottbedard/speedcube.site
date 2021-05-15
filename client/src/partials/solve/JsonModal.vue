<template>
  <Modal
    padded
    :visible="visible"
    @close="close">
    <form ref="form" @submit.prevent="apply">
      <Input
        v-model="json"
        autofocus
        input-class="font-mono"
        label="Keyboard configuration"
        required />

      <p class="my-6">
        Be very careful editing this, invalid JSON can cause errors. This feature exists primarily to facilitate sharing configurations, and copy / pasting between puzzles.
      </p>

      <ActionBar
        button-text="Apply"
        button-type="submit"
        primary-link-text="Cancel"
        @primary-link-click="close" />
    </form>
  </Modal>
</template>

<script lang="ts">
import { ActionBar, Input, Modal } from '@/components'
import { alert } from '@/app/alerts'
import { defineComponent, ref, watch } from 'vue'
import { previewKeyboardConfig } from '@/app/store/state'

export default defineComponent({
  setup(props, { emit }) {
    const form = ref<HTMLElement>()
    const json = ref('{}')

    const apply = () => {
      try {
        previewKeyboardConfig.value = JSON.parse(json.value)

        close()

        alert({ text: 'Applied JSON configuration', type: 'success' })
      } catch {
        form.value?.querySelector('input')?.focus()
      
        alert({ text: 'Failed to apply invalid JSON', type: 'failed' })
      }
    }

    const close = () => {
      emit('close')
    }

    watch(() => props.visible, () => {
      if (props.visible) {
        json.value = JSON.stringify(previewKeyboardConfig.value)
      }
    })

    return {
      apply,
      close,
      form,
      json,
    }
  },
  emits: [
    'close',
  ],
  components: {
    ActionBar,
    Input,
    Modal,
  },
  props: {
    visible: Boolean,
  },
})
</script>
