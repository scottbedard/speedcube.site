<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Keybinding } from '@/app/types/puzzle'
import { noop, stubObject } from 'lodash-es'
import { useEventListener } from '@vueuse/core'

export default defineComponent({
  setup(props, { emit }) {
    useEventListener(window, 'keypress', (e) => {
      const turn = props.config?.[e.key]

      if (turn) {
        const binding: Keybinding = { key: e.key, turn }
        
        emit('turn', binding)
      }
    })
  },
  emits: [
    'turn',
  ],
  name: 'Keyboard',
  props: {
    config: {
      default: stubObject,
      type: Object as PropType<Record<string, string> | null>,
    },
  },
  render: noop,
})
</script>