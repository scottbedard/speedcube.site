<template>
  <slot />
</template>

<script lang="ts">
/* eslint-disable */
import { colorProp, useColor } from '@/app/three/behaviors/color';
import { computed, defineComponent, watchEffect } from 'vue';
import { degreesToRadians } from '@/app/utils/math';
import { DodecahedronGeometry, IcosahedronGeometry, Mesh, MeshLambertMaterial } from 'three';
import { positionProp, usePosition } from '@/app/three/behaviors/position';
import { useDisposable } from '@/app/three/behaviors/disposable';
import { useHidden } from '@/app/three/behaviors/hidden';
import { useNesting } from '@/app/three/behaviors/nesting';

export default defineComponent({
  setup(props) {
    // use a dodecahedron for the hit box
    const dodecahedronGeometry = new DodecahedronGeometry(1);

    const material = new MeshLambertMaterial({
      wireframe: props.wireframe,
    });

    useColor(material, () => props.color);
    useDisposable(material);

    const dodecahedron = new Mesh(dodecahedronGeometry, material);

    useNesting(dodecahedron);
    usePosition(dodecahedron, () => props.position);
    useHidden(dodecahedron, () => props.hidden);
    watchEffect(() => dodecahedron.scale.set(props.radius, props.radius, props.radius));

    const innerRadius = computed(() => {
      return ((4 * props.radius) / (Math.sqrt(3) * (1 + Math.sqrt(5)))) / 2 * Math.sqrt((25 + (11 * Math.sqrt(5))) / 10);
    });

    const icosahedronGeometry = new IcosahedronGeometry(innerRadius.value);

    icosahedronGeometry.rotateX(degreesToRadians(-90));

    const icosahedronMaterial = new MeshLambertMaterial({
      color: 0xff0000,
      // wireframe: props.wireframe,
    });

    const icosahedron = new Mesh(icosahedronGeometry, icosahedronMaterial);

    dodecahedron.rotateX(degreesToRadians(-144));

    useNesting(icosahedron);
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
