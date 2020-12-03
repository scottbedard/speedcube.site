<template>
  <button
    class="border-none font-bold h-12 px-6 rounded text-white focus:outline-none focus:shadow-outline hover:shadow"
    :class="[color, pointer]"
    :disabled="loading">
    <v-spinner v-if="loading" class="text-lighten-50" />
    <slot v-else />
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import VSpinner from '@/components/spinner.vue';

export default defineComponent({
  setup(props) {
    const color = computed(() => {
      return 'bg-green-600 hover:bg-green-500';
    });

    const pointer = computed(() => {
      return props.loading ? 'pointer-events-none' : 'cursor-pointer';
    });

    return {
      color,
      pointer,
    };
  },
  components: {
    VSpinner,
  },
  props: {
    loading: {
      default: false,
      type: Boolean,
    },
  },
});
</script>