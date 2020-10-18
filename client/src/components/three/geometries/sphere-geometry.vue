<template>
  <slot />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Mesh, MeshLambertMaterial, SphereGeometry } from 'three';
import { positionProp, usePosition } from '@/app/three/behaviors/position';
import { useColor } from '@/app/three/behaviors/color';
import { useDisposable } from '@/app/three/behaviors/disposable';
import { useNesting } from '@/app/three/behaviors/nesting';

export default defineComponent({
  setup(props) {
    const geometry = new SphereGeometry(props.radius, props.widthSegments, props.heightSegments);
    useDisposable(geometry);

    const material = new MeshLambertMaterial({ wireframe: props.wireframe });
    useColor(material, () => props.color);
    useDisposable(material);
  
    const sphere = new Mesh(geometry, material);
    useNesting(sphere);
    usePosition(sphere, () => props.position);
  },
  props: {
    color: {
      default: 0xffffff,
      type: [Number, String],
    },
    heightSegments: {
      default: 12,
      type: Number,
    },
    position: positionProp,
    radius: {
      default: 1,
      type: Number,
    },
    widthSegments: {
      default: 16,
      type: Number,
    },
    wireframe: {
      default: false,
      type: Boolean,
    },
  },
});
</script>
