<template>
  <span>
    <svg
      v-bind="icon.attrs"
      v-html="icon.contents"
      :height="height || sizePx"
      :stroke-width="stroke"
      :width="width" />
  </span>
</template>

<script lang="ts">
// https://feathericons.com
import feather from 'feather-icons'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  setup(props) {
    const icon = computed(() => feather.icons[props.name])

    const sizePx = computed(() => Number(props.size) * 4)

    return {
      icon,
      sizePx,
    }
  },
  props: {
    height: {
      type: Number,
    },
    name: {
      required: true,
      type: String,
    },
    size: {
      default: 5,
      type: [Number, String],
    },
    stroke: {
      default: 2,
      type: [Number, String],
    },
    width: {
      type: Number,
    },
  },
})
</script>
