<template>
  <div class="max-w-xl">
    <IconText name="star">
      This component exists to make displaying text aside an icon easier. It's main purpose is to keep
      the top line of text aligned with the icon when line-wrapping.
    </IconText>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IconText } from '@/components'

export default defineComponent({
  components: {
    IconText
  },
  name: 'IconTextExample',
})
</script>
