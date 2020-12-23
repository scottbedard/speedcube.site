<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { KeyboardConfig } from '@/types/puzzle';
import { noop } from 'lodash-es';
import { useEventListener } from '@vueuse/core';

export default defineComponent({
  setup(props, { emit }) {
    const currentBindings = computed(() => {
      return props.currentKeyspace !== 'default' && props.keyboardConfig.keyspaces[props.currentKeyspace]
        ? props.keyboardConfig.keyspaces[props.currentKeyspace]
        : props.keyboardConfig.default;
    });

    // listen for turns
    useEventListener(document.body, 'keypress', ({ ctrlKey, key }: any) => {
      if (!ctrlKey && currentBindings.value[key]) {
        emit('turn', currentBindings.value[key]);
      }
    });

    // listen for keyspace changes
    useEventListener(document.body, 'keyup', ({ ctrlKey, key }: any) => {
      if (ctrlKey && (key === ' ' || Object.keys(props.keyboardConfig.keyspaces).includes(key))) {
        emit('change-keyspace', key === ' ' ? 'default' : key);
      }
    });

    return {
      currentBindings,
    };
  },
  emits: [
    'change-keyspace',
    'turn',
  ],
  render: noop,
  props: {
    currentKeyspace: {
      default: ' ',
      type: String,
    },
    keyboardConfig: {
      required: true,
      type: Object as PropType<KeyboardConfig>,
    },
  },
});
</script>
