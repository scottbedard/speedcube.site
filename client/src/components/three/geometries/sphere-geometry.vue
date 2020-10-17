<template>
  <slot />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Color, Mesh, MeshLambertMaterial, SphereGeometry } from 'three';
import { positionProp, usePosition } from '@/app/three/position';
import { useDisposable } from '@/app/three/disposable';
import { useNesting } from '@/app/three/nesting';

export default defineComponent({
  setup(props) {
    const geometry = new SphereGeometry(props.radius, props.widthSegments, props.heightSegments);

    const material = new MeshLambertMaterial({
      color: new Color(props.color),
      wireframe: props.wireframe,
    });

    const sphere = new Mesh(geometry, material);

    useDisposable(geometry);
    useDisposable(material);
    useNesting(sphere);
    usePosition(sphere, () => props.position);
  },
  props: {
    color: {
      default: '#ff0',
      type: [Number, String],
    },
    heightSegments: {
      default: 6,
      type: Number,
    },
    position: positionProp,
    radius: {
      default: 1,
      type: Number,
    },
    widthSegments: {
      default: 8,
      type: Number,
    },
    wireframe: {
      default: false,
      type: Boolean,
    },
  },
});
</script>
