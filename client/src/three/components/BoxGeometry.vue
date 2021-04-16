<template>
  <slot />
  <Group :position="{ y: halfHeight }" :rotation="[1, 0, 0, 90]">
    <slot name="up" />
  </Group>
  <Group :position="{ x: -halfWidth }" :rotation="[0, 1, 0, 90]">
    <slot name="left" />
  </Group>
  <Group :position="{ z: halfDepth }">
    <slot name="front" />
  </Group>
  <Group :position="{ x: halfWidth }" :rotation="[0, 1, 0, -90]">
    <slot name="right" />
  </Group>
  <Group :position="{ z: -halfDepth }" :rotation="[0, 1, 0, 180]">
    <slot name="back" />
  </Group>
  <Group :position="{ y: -halfHeight }" :rotation="[1, 0, 0, -90]">
    <slot name="down" />
  </Group>
</template>

<script lang="ts">
import { BoxGeometry, Group, Mesh, MeshLambertMaterial } from 'three'
import { computed, defineComponent, PropType, watchEffect } from 'vue'
import { isNumber } from 'lodash-es'

import {
  useColor,
  useColorProp,
  useDisposable,
  useHidden,
  useHiddenProp,
  useNesting,
  usePosition,
  usePositionProp,
  useRotation,
  useRotationProp,
} from '@/three/behaviors'

import GroupComponent from './Group.vue'

type Dimensions = {
  depth: number,
  height: number,
  width: number,
}

export default defineComponent({
  setup(props) {
    const dimensions = computed(() => {
      return isNumber(props.dimensions)
        ? {
          depth: props.dimensions,
          height: props.dimensions,
          width: props.dimensions,
        } : {
          depth: props.dimensions.depth || 0,
          height: props.dimensions.height || 0,
          width: props.dimensions.width || 0,
        }
    })

    const halfDepth = computed(() => dimensions.value.depth / 2)
    const halfHeight = computed(() => dimensions.value.height / 2)
    const halfWidth = computed(() => dimensions.value.width / 2)

    const group = new Group

    useNesting(group)
    usePosition(group, () => props.position)
    useRotation(group, () => props.rotation)

    const geometry = new BoxGeometry(1, 1, 1)

    useDisposable(geometry)

    const material = new MeshLambertMaterial({
      wireframe: props.wireframe,
    })

    useColor(material, () => props.color)
    useDisposable(material)

    const cube = new Mesh(geometry, material)

    useHidden(cube, () => props.hidden)

    group.add(cube)

    watchEffect(() => {
      const { depth, height, width } = dimensions.value

      cube.scale.set(width, height, depth)
    });

    return {
      halfDepth,
      halfHeight,
      halfWidth,
    }
  },
  components: {
    Group: GroupComponent,
  },
  name: 'BoxGeometry',
  props: {
    color: useColorProp,
    dimensions: {
      default: 1,
      type: [Number, Object] as PropType<number | Partial<Dimensions>>,
    },
    hidden: useHiddenProp,
    position: usePositionProp,
    rotation: useRotationProp,
    wireframe: {
      default: true,
      type: Boolean,
    },
  },
});
</script>