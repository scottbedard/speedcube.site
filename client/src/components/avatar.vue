<template>
  <span
    class="inline-flex items-center justify-center overflow-hidden rounded-full"
    :class="[sizeClasses]">
    <img
      v-if="file"
      :src="file.path" />
    <v-icon
      v-else
      class="h-auto w-full"
      name="user"
      stroke="1.3" />
  </span>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { File } from '@/types/models/file';
import VIcon from '@/components/icon.vue';

export default defineComponent({
  setup(props) {
    const sizeClasses = computed(() => {
      if (props.size === 'xl') {
        return 'h-64 w-64';
      }

      return 'h-10 w-10';
    });

    return {
      sizeClasses,
    };
  },
  components: {
    VIcon,
  },
  props: {
    file: {
      default: null,
      type: Object as PropType<File | null>,
    },
    size: {
      default: 'sm',
      type: String as PropType<'sm' | 'xl'>,
    },
  },
});
</script>
