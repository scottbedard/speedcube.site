<template>
  <component
    v-bind="attrs"
    class="flex items-center px-6 py-3 first:pt-6 last:pb-6"
    :is="is">
    <Icon
      class="mr-3"
      :name="icon"
      :size="6"
      :stroke="2" />
    {{ text }}
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { RouteLocationRaw } from 'vue-router'
import Icon from './Icon.vue'

export default defineComponent({
  setup(props) {
    const attrs = computed(() => {
      return props.to
        ? { to: props.to }
        : { href: props.href }
    })

    const is = computed(() => props.to ? 'RouterLink' : 'a')
  
    return {
      attrs,
      is
    }
  },
  components: {
    Icon,
  },
  name: 'CardLink',
  props: {
    href: {
      type: String,
    },
    icon: {
      required: true,
      type: String,
    },
    text: {
      required: true,
      type: String,
    },
    to: {
      type: Object as PropType<RouteLocationRaw>,
    },
  },
})
</script>
