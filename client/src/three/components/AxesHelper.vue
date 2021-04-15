<script lang="ts">
  import { AxesHelper } from 'three'
  import { defineComponent, PropType } from 'vue'
  import { noop, stubObject } from 'lodash-es'
  import { useNesting, usePosition } from '@/three/behaviors'
  import { Vector } from '@/three/types'

  export default defineComponent({
    setup(props) {
      const axesHelper = new AxesHelper(props.size)
  
      useNesting(axesHelper)
      usePosition(axesHelper, () => props.position)
    },
    render: noop,
    props: {
      position: {
        default: stubObject,
        type: Object as PropType<Partial<Vector>>
      },
      size: {
        default: 1,
        type: Number,
      },
    },
  })
  </script>
