<template>
  <button
    :class="[
      'inline-flex items-center min-h-12 px-6 py-2 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
      {
        'pointer-events-none': disabled,
        'bg-green-500 text-gray-50 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500 dark:hover:text-white': primary,
        'bg-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600': !primary,
      }
    ]"
    :disabled="disabled">
    <Spinner v-if="loading" />
    <slot v-else />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Spinner from './Spinner.vue'

export default defineComponent({
  name: 'Button',
  components: {
    Spinner,
  },
  props: {
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
  },
})
</script>
