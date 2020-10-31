<template>
  <slot />
</template>

<script lang="ts">
import { colorProp, useColor } from '@/app/three/behaviors/color';
import { defineComponent } from 'vue';
import { DodecahedronGeometry, Mesh, MeshLambertMaterial } from 'three';
import { positionProp, usePosition } from '@/app/three/behaviors/position';
import { useDisposable } from '@/app/three/behaviors/disposable';
import { useHidden } from '@/app/three/behaviors/hidden';
import { useNesting } from '@/app/three/behaviors/nesting';

export default defineComponent({
  setup(props) {
    const geometry = new DodecahedronGeometry(props.radius);

    const material = new MeshLambertMaterial({
      wireframe: props.wireframe,
    });

    useColor(material, () => props.color);
    useDisposable(material);

    const dodecahedron = new Mesh(geometry, material);
    useNesting(dodecahedron);
    usePosition(dodecahedron, () => props.position);
    useHidden(dodecahedron, () => props.hidden);
  },
  props: {
    color: colorProp,
    hidden: {
      default: false,
      type: Boolean,
    },
    position: positionProp,
    radius: {
      default: 1,
      type: Number,
    },
    wireframe: {
      default: false,
      type: Boolean,
    },
  },
});
</script>
