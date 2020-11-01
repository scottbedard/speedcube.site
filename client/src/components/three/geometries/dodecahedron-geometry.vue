<template>
  <slot />
  <v-group :position="position.u">
    <v-sphere-geometry color="#f00" radius="0.05" wireframe />
  </v-group>
  <v-group :position="position.l">
    <v-sphere-geometry color="#f00" radius="0.05" wireframe />
  </v-group>
  <v-group :position="position.f">
    <v-sphere-geometry color="#f00" radius="0.05" wireframe />
  </v-group>
  <v-group :position="position.r">
    <v-sphere-geometry color="#f00" radius="0.05" wireframe />
  </v-group>
  <v-group :position="position.br">
    <v-sphere-geometry color="#f00" radius="0.05" wireframe />
  </v-group>
  <v-group :position="position.bl">
    <v-sphere-geometry color="#f00" radius="0.05" wireframe />
  </v-group>
  <v-group :position="position.b">
    <v-sphere-geometry color="#f00" radius="0.05" wireframe />
  </v-group>
  <v-group :position="position.dbl">
    <v-sphere-geometry color="#f00" radius="0.05" wireframe />
  </v-group>
  <v-group :position="position.dbr">
    <v-sphere-geometry color="#f00" radius="0.05" wireframe />
  </v-group>
  <v-group :position="position.dl">
    <v-sphere-geometry color="#f00" radius="0.05" wireframe />
  </v-group>
  <v-group :position="position.dr">
    <v-sphere-geometry color="#f00" radius="0.05" wireframe />
  </v-group>
  <v-group :position="position.d">
    <v-sphere-geometry color="#f00" radius="0.05" wireframe />
  </v-group>
</template>

<script lang="ts">
/* eslint-disable */
import { colorProp, useColor } from '@/app/three/behaviors/color';
import { computed, defineComponent, watchEffect } from 'vue';
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

    const dodecahedronGeometry = new DodecahedronGeometry(1);

    const material = new MeshLambertMaterial({
      // wireframe: props.wireframe,
    });

    useColor(material, () => props.color);
    useDisposable(material);

    const dodecahedron = new Mesh(dodecahedronGeometry, material);
    dodecahedron.rotateX(degreesToRadians(-144));
    group.add(dodecahedron);

    useNesting(group);
    usePosition(group, () => props.position);
    useHidden(group, () => props.hidden);

    watchEffect(() => {
      dodecahedron.scale.set(props.radius, props.radius, props.radius)
    });

    // create an inscribed icosahedron to define slot positions
    const innerRadius = computed(() => {
      return ((4 * props.radius) / (Math.sqrt(3) * (1 + Math.sqrt(5)))) / 2 * Math.sqrt((25 + (11 * Math.sqrt(5))) / 10);
    });

    const icosahedronGeometry = new IcosahedronGeometry(innerRadius.value);
    icosahedronGeometry.rotateX(degreesToRadians(-234));

    // position
    const position = computed(() => {
      return {
        dbl: icosahedronGeometry.vertices[0],
        d: icosahedronGeometry.vertices[1],
        dl: icosahedronGeometry.vertices[2],
        dr: icosahedronGeometry.vertices[3],
        f: icosahedronGeometry.vertices[4],
        l: icosahedronGeometry.vertices[5],
        dbr: icosahedronGeometry.vertices[6],
        b: icosahedronGeometry.vertices[7],
        bl: icosahedronGeometry.vertices[8],
        u: icosahedronGeometry.vertices[9],
        r: icosahedronGeometry.vertices[10],
        br: icosahedronGeometry.vertices[11],
      };
    });

    return {
      position,
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
