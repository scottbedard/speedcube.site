<template>
  <div class="flex">
    <Icon
      class="mr-2 mt-1"
      :name="name"
      :svg-class="svgClass" />
    <slot />
  </div>
</template>

<script lang="ts">
import Icon from './Icon.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    Icon,
  },
  name: 'IconText',
  props: {
    name: {
      required: true,
      type: String,
    },
    svgClass: {
      type: String,
    },
  },
})
</script>