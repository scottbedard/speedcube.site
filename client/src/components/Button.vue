<template>
  <component
    :class="[
      'inline-flex items-center justify-center min-h-12 px-6 py-2 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
      {
        'pointer-events-none': disabled,
        'bg-green-500 text-gray-50 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500 dark:hover:text-white': primary,
        'bg-red-500 text-gray-50 hover:bg-red-600': !primary && danger,
        'bg-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600': !primary && !danger,
      }
    ]"
    :disabled="disabled"
    :is="to ? 'RouterLink' : 'button'"
    :to="to">
    <Spinner v-if="loading" />
    <slot v-else />
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { RouteLocationRaw } from 'vue-router'
import Spinner from './Spinner.vue'

export default defineComponent({
  components: {
    Spinner,
  },
  props: {
    danger: {
      default: false,
      type: Boolean,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    loading: {
      default: false,
      type: Boolean,
    },
    primary: {
      default: false,
      type: Boolean,
    },
    to: {
      default: null,
      type: Object as PropType<RouteLocationRaw>,
    },
  },
})
</script>
