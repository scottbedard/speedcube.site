<template>
  <div
    v-text="displayTime"
    class="font-mono text-4xl" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  setup(props) {
    const displayTime = computed(() => Math.ceil(props.inspectionCountdown / 1000))

    return {
      displayTime,
    }
  },
  name: 'GameplayInspection',
  props: {
    inspectionCountdown: {
      required: true,
      type: Number,
    },
  },
})
</script>
