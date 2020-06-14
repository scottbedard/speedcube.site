<template>
  <component
    :is="tag"
    :to="to"
    @click="$emit('click', $event)">
    <slot />
  </component>
</template>

<script>
import { computed, defineComponent } from '@vue/composition-api';

export default defineComponent({
  setup(props) {
    const tag = computed(() => props.to ? 'RouterLink' : 'button');

    return {
      tag,
    };
  },
  props: {
    to: [Object, String],
  },
});
</script>