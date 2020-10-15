<template>
  <slot />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Group } from 'three';
import { stubObject } from 'lodash-es';
import { useNesting } from '@/app/three/utils/nestable';
import { usePosition } from '@/app/three/utils/position';
import { Vector } from '@/app/three/types';

export default defineComponent({
  setup(props) {
    const group = new Group;

    useNesting(group);
    usePosition(group, props.position);
  },
  props: {
    position: {
      default: stubObject,
      type: Object as PropType<Partial<Vector>>,
    },
  },
});
</script>
