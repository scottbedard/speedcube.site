<template>
  <Button primary @click="open">
    open modal
  </Button>

  <Modal
    v-if="expanded"
    padded
    @close="close">
    <h3 class="mb-6 text-3xl">
      Be aware of the focus behavior
    </h3>

    <p class="mb-6">
      Modals auto focus their first eligible element, and trap focus within the
      them. When closed, focus is returned to the element that previously had it.
    </p>

    <div class="gap-6 grid sm:grid-cols-2"> 
      <div>
        <Input placeholder="First input" />
      </div>

      <div>
        <Input placeholder="Second input" />
      </div>

      <div class="flex justify-end sm:col-span-2">
        <Button primary @click="close">Close</Button>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Button, Input, Modal } from '@/components'

export default defineComponent({
  setup() {
    const expanded = ref(false)

    const close = () => {
      expanded.value = false
    }

    const open = () => {
      expanded.value = true
    }

    return {
      close,
      expanded,
      open
    }
  },
  components: {
    Button,
    Input,
    Modal,
  },
  name: 'ModalExample',
})
</script>
