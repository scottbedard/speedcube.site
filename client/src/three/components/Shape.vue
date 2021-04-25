<script lang="ts">
import { defineComponent, watchEffect } from 'vue'
import { noop } from 'lodash-es'

import {
  Group,
  Material,
  Mesh,
  ShapeBufferGeometry,
} from 'three'

import {
  useHidden,
  useHiddenProp,
  useNesting,
  usePosition,
  usePositionProp,
} from '@/three/behaviors'

export default defineComponent({
  setup(props) {
    const group = new Group

    watchEffect(() => {
      group.remove(...group.children)

      if (props.geometry) {
        if (props.innerMaterial) {
          group.add(new Mesh(props.geometry, props.innerMaterial))
        }

        if (props.outerMaterial) {
          group.add(new Mesh(props.geometry, props.outerMaterial))
        }
      }
    })

    useHidden(group, () => props.hidden)
    useNesting(group)
    usePosition(group, () => props.position)
  },
  name: 'Shape',
  props: {
    geometry: ShapeBufferGeometry,
    hidden: useHiddenProp,
    innerMaterial: Material,
    outerMaterial: Material,
    position: usePositionProp,
  },
  render: noop
})
</script>