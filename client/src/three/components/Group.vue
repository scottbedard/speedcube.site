<template>
  <slot />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Group } from 'three';

import {
  useHidden,
  useHiddenProp,
  useNesting,
  usePosition,
  usePositionProp,
  useRotation,
  useRotationProp,
} from '@/three/behaviors';

export default defineComponent({
  setup(props) {
    const group = new Group

    useHidden(group, () => props.hidden)
    useNesting(group)
    usePosition(group, () => props.position)
    useRotation(group, () => props.rotation)
  },
  name: 'Group',
  props: {
    hidden: useHiddenProp,
    position: usePositionProp,
    rotation: useRotationProp,
  },
})
</script>
