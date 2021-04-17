<script lang="ts">
import { computed, defineComponent, watch, watchEffect } from 'vue'
import { isDark } from '@/app/store/state'
import { noop } from 'lodash-es'

import {
  EdgesGeometry,
  Group,
  LineBasicMaterial,
  LineSegments,
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

    const outline = computed(() => {
      const material = new LineBasicMaterial({
        color: isDark.value ? 0x374151 : 0x6B7280
      })

      return new LineSegments(props.edgesGeometry, material)
    })

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

      group.add(outline.value)
    })

    useHidden(group, () => props.hidden)
    useNesting(group)
    usePosition(group, () => props.position)
  },
  name: 'Shape',
  props: {
    edgesGeometry: EdgesGeometry,
    geometry: ShapeBufferGeometry,
    hidden: useHiddenProp,
    innerMaterial: Material,
    outerMaterial: Material,
    position: usePositionProp,
  },
  render: noop
})
</script>