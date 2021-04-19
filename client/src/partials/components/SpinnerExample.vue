<template>
  <Spinner />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Spinner } from '@/components'

export default defineComponent({
  setup() {

  },
  components: {
    Spinner,
  },
  name: 'SpinnerExample',
})
</script>
