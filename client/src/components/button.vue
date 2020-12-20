<template>
  <button
    class="border-none font-bold h-12 px-8 rounded tracking-wide transition-colors focus:outline-none focus:shadow-outline hover:shadow"
    :class="[color, pointer]"
    :disabled="!isClickable">
    <v-spinner v-if="loading" class="text-lighten-50" />
    <slot v-else />
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import VSpinner from '@/components/spinner.vue';

export default defineComponent({
  setup(props) {
    const isClickable = computed(() => !props.disabled && !props.loading);

    const color = computed(() => {
      if (props.disabled) {
        return 'bg-gray-600 text-gray-300';
      }

      if (props.danger) {
        return 'bg-red-500 text-gray-100 hover:bg-red-400 hover:text-white';
      }
  
      return 'bg-green-600 text-gray-100 hover:bg-green-500 hover:text-white';
    });

    const pointer = computed(() => isClickable.value ? 'cursor-pointer' : 'pointer-events-none');

    return {
      color,
      isClickable,
      pointer,
    };
  },
  components: {
    VSpinner,
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
    icon: {
      type: String,
    },
    loading: {
      default: false,
      type: Boolean,
    },
  },
});
</script>