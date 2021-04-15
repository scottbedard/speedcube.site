<script lang="ts">
  import { AxesHelper } from 'three'
  import { defineComponent } from 'vue'
  import { noop } from 'lodash-es'
  import { useNesting, usePosition, positionProp } from '@/three/behaviors'

  export default defineComponent({
    setup(props) {
      const axesHelper = new AxesHelper(props.size)
  
      useNesting(axesHelper)
      usePosition(axesHelper, () => props.position)
    },
    render: noop,
    props: {
      position: positionProp,
      size: {
        default: 1,
        type: Number,
      },
    },
  })
  </script>
