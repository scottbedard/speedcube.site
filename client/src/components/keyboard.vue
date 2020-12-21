<script lang="ts">
import { computed, defineComponent, ref, PropType } from 'vue';
import { KeyboardConfig } from '@/types/puzzle';
import { noop } from 'lodash-es';
import { useEventListener } from '@vueuse/core';

export default defineComponent({
  setup(props, { emit }) {
    const selectedKeyspace = ref('');

    const keybindings = computed(() => {
      return selectedKeyspace.value === ''
        ? props.keyboardConfig.default
        : props.keyboardConfig.keyspaces[selectedKeyspace.value]
    });

    // listen for keypress events
    useEventListener(document.body, 'keypress', (e: any) => {
      const key: string = e.key;
      const ctrlKey: boolean = e.ctrlKey;

      if (ctrlKey && key !== ' ' && Object.keys(props.keyboardConfig.keyspaces).includes(key)) {
        selectedKeyspace.value = key;
      } else if (keybindings.value[key]) {
        emit('turn', keybindings.value[key]);
      }
    });

    // use keyup for default keyspace
    // @todo: look into why this doesn't fire on keypress
    useEventListener(document.body, 'keyup', (e: any) => {
      if (e.key === ' ' && e.ctrlKey) {
        selectedKeyspace.value = '';
      }
    });

    return {
      selectedKeyspace,
    };
  },
  emits: [
    'turn',
  ],
  render: noop,
  props: {
    keyboardConfig: {
      required: true,
      type: Object as PropType<KeyboardConfig>,
    },
  },
});
</script>
