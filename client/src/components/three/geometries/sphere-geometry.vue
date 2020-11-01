<template>
  <slot />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Mesh, MeshLambertMaterial, SphereGeometry } from 'three';
import { positionProp, usePosition } from '@/app/three/behaviors/position';
import { colorProp, useColor } from '@/app/three/behaviors/color';
import { useDisposable } from '@/app/three/behaviors/disposable';
import { useNesting } from '@/app/three/behaviors/nesting';
import { useHidden } from '@/app/three/behaviors/hidden';

export default defineComponent({
  setup(props) {
    const geometry = new SphereGeometry(Number(props.radius), Number(props.widthSegments), Number(props.heightSegments));
    useDisposable(geometry);

    const material = new MeshLambertMaterial({ wireframe: props.wireframe });
    useColor(material, () => props.color);
    useDisposable(material);
  
    const sphere = new Mesh(geometry, material);
    useNesting(sphere);
    usePosition(sphere, () => props.position);
    useHidden(sphere, () => props.hidden);
  },
  props: {
    color: colorProp,
    heightSegments: {
      default: 12,
      type: [Number, String],
    },
    hidden: {
      default: false,
      type: Boolean,
    },
    position: positionProp,
    radius: {
      default: 1,
      type: [Number, String],
    },
    widthSegments: {
      default: 16,
      type: [Number, String],
    },
    wireframe: {
      default: false,
      type: Boolean,
    },
  },
});
</script>
