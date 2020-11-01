<template>
  <slot />
  <v-group :position="positions.u">
    <slot name="u" />
  </v-group>
  <v-group :position="positions.l">
    <slot name="l" />
  </v-group>
  <v-group :position="positions.f">
    <v-sphere-geometry color="#f00" radius="0.05" wireframe />
  </v-group>
  <v-group :position="positions.r">
    <v-sphere-geometry color="#f00" radius="0.05" wireframe />
  </v-group>
  <v-group :position="positions.br">
    <v-sphere-geometry color="#f00" radius="0.05" wireframe />
  </v-group>
  <v-group :position="positions.bl">
    <v-sphere-geometry color="#f00" radius="0.05" wireframe />
  </v-group>
  <v-group :position="positions.b">
    <v-sphere-geometry color="#f00" radius="0.05" wireframe />
  </v-group>
  <v-group :position="positions.dbl">
    <v-sphere-geometry color="#f00" radius="0.05" wireframe />
  </v-group>
  <v-group :position="positions.dbr">
    <v-sphere-geometry color="#f00" radius="0.05" wireframe />
  </v-group>
  <v-group :position="positions.dl">
    <v-sphere-geometry color="#f00" radius="0.05" wireframe />
  </v-group>
  <v-group :position="positions.dr">
    <v-sphere-geometry color="#f00" radius="0.05" wireframe />
  </v-group>
  <v-group :position="positions.d">
    <v-sphere-geometry color="#f00" radius="0.05" wireframe />
  </v-group>
</template>

<script lang="ts">
/* eslint-disable */
import { colorProp, useColor } from '@/app/three/behaviors/color';
import { computed, defineComponent, reactive, watchEffect } from 'vue';
import { degreesToRadians } from '@/app/utils/math';
import { DodecahedronGeometry, Group, IcosahedronGeometry, Mesh, MeshLambertMaterial } from 'three';
import { positionProp, usePosition } from '@/app/three/behaviors/position';
import { useDisposable } from '@/app/three/behaviors/disposable';
import { useHidden } from '@/app/three/behaviors/hidden';
import { useNesting } from '@/app/three/behaviors/nesting';
import VGroup from '@/components/three/utils/group.vue';
import VSphereGeometry from '@/components/three/geometries/sphere-geometry.vue';

export default defineComponent({
  setup(props) {
    const group = new Group();

    // outer dodecahedron for scaling and hit box
    const geometry = new DodecahedronGeometry(1);

    const material = new MeshLambertMaterial({
      wireframe: props.wireframe,
    });

    const dodecahedron = new Mesh(geometry, material);

    useColor(material, () => props.color);
    useDisposable(material);

    dodecahedron.rotateX(degreesToRadians(-144));

    group.add(dodecahedron);

    useNesting(group);
    usePosition(group, () => props.position);
    useHidden(group, () => props.hidden);
    
    const positions = reactive({
      dbl: {},
      d: {},
      dl: {},
      dr: {},
      f: {},
      l: {},
      dbr: {},
      b: {},
      bl: {},
      u: {},
      r: {},
      br: {},
    });

    watchEffect(() => {
      dodecahedron.scale.set(props.radius, props.radius, props.radius);

      const innerRadius = ((4 * props.radius) / (Math.sqrt(3) * (1 + Math.sqrt(5)))) / 2 * Math.sqrt((25 + (11 * Math.sqrt(5))) / 10);
      const icosahedron = new IcosahedronGeometry(innerRadius);
      icosahedron.rotateX(degreesToRadians(-234));
      positions.dbl = icosahedron.vertices[0];
      positions.d = icosahedron.vertices[1];
      positions.dl = icosahedron.vertices[2];
      positions.dr = icosahedron.vertices[3];
      positions.f = icosahedron.vertices[4];
      positions.l = icosahedron.vertices[5];
      positions.dbr = icosahedron.vertices[6];
      positions.b = icosahedron.vertices[7];
      positions.bl = icosahedron.vertices[8];
      positions.u = icosahedron.vertices[9];
      positions.r = icosahedron.vertices[10];
      positions.br = icosahedron.vertices[11];
      icosahedron.dispose();
    });

    return {
      positions,
    };
  },
  components: {
    VGroup,
    VSphereGeometry,
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
