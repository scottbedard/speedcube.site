<template>
  <Icon
    name="feather"
    :size="size"
    :stroke="stroke" />

  <div class="gap-2 grid mt-6">
    <a href="https://feathericons.com/" target="_blank">feathericons.com</a>
    <div>
      <div>Size: {{ size }}</div>
      <RangeInput
        v-model="size"
        class="max-w-xs"
        :min="0"
        :max="40"
        :step="0.01" />
    </div>
    <div>
      <div>Stroke: {{ stroke }}</div>
      <RangeInput
        v-model="stroke"
        class="max-w-xs"
        :min="0"
        :max="10"
        :step="0.01" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Icon, RangeInput } from '@/components'

export default defineComponent({
  setup() {
    const size = ref(12)
    const stroke = ref(2)

    return {
      size,
      stroke
    }
  },
  components: {
    Icon,
    RangeInput,
  },
  name: 'IconExample',
})
</script>
