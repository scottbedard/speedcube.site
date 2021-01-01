<template>
  <component
    class="border-none inline-flex font-bold h-12 items-center px-6 rounded tracking-wide transition-colors focus:outline-none focus:shadow-outline hover:shadow"
    :class="[colorClasses, pointerClasses]"
    :disabled="!isClickable"
    :is="is"
    :to="to">
    <v-spinner v-if="loading" class="text-lighten-50" />
    <slot v-else />
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { RouteLocationNormalized } from 'vue-router';
import VSpinner from '@/components/spinner.vue';

export default defineComponent({
  setup(props) {
    const is = computed(() => {
      if (props.to) {
        return 'router-link';
      }

      return 'button';
    });

    const isClickable = computed(() => !props.disabled && !props.loading);

    const colorClasses = computed(() => {
      if (props.disabled) {
        return 'bg-gray-600 text-gray-300';
      }

      if (props.danger) {
        return 'bg-red-500 text-gray-100 hover:bg-red-400 hover:text-white';
      }
  
      return 'bg-green-600 text-gray-100 hover:bg-green-500 hover:text-white';
    });

    const pointerClasses = computed(() => isClickable.value ? 'cursor-pointer' : 'pointer-events-none');

    return {
      colorClasses,
      is,
      isClickable,
      pointerClasses,
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
    size: {
      default: 'default',
      type: String as PropType<'sm' | 'default'>,
    },
    to: {
      type: Object as PropType<RouteLocationNormalized>,
    },
  },
});
</script>