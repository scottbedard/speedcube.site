<script lang="ts">
import { AxesHelper } from 'three'
import { defineComponent } from 'vue'
import { noop } from 'lodash-es'
import { useNesting, usePosition, usePositionProp } from '@/three/behaviors'

export default defineComponent({
  setup(props) {
    const axesHelper = new AxesHelper(props.size)

    useNesting(axesHelper)
    usePosition(axesHelper, () => props.position)
  },
  name: 'AxesHelper',
  render: noop,
  props: {
    position: usePositionProp,
    size: {
      default: 1,
      type: Number,
    },
  },
})
</script>
