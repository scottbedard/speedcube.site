<template>
  <div>
    <label
      v-text="text"
      :for="$props.for" />
    <sup
      v-if="required"
      class="bg-green-500 h-1.5 inline-block mb-1 ml-0.5 rounded-full w-1.5" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Label',
  props: {
    for: {
      default: '',
      type: String,
    },
    required: {
      type: Boolean,
    },
    text: {
      required: true,
      type: String,
    },
  }
})
</script>
