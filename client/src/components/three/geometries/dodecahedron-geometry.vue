<template>
  <slot />
  <v-group :rotation="[1, 0, 0, 144]">
    <!-- <v-sphere-geometry
      color="#00f"
      :radius="0.05"
      :position="ball" /> -->
    <v-group :position="positions.u" :rotation="rotations.u">
      <slot name="u" />
      <v-sphere-geometry color="#f00" radius="0.05" wireframe />
    </v-group>
    <v-group :position="positions.l" :rotation="rotations.l">
      <slot name="l" />
      <v-sphere-geometry color="#f00" radius="0.05" wireframe />
    </v-group>
    <v-group :position="positions.f" :rotation="rotations.f">
      <slot name="f" />
      <v-sphere-geometry color="#f00" radius="0.05" wireframe />
    </v-group>
  </v-group>
  <!-- 
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
  </v-group> -->
</template>

<script lang="ts">
/* eslint-disable */
import { colorProp, useColor } from '@/app/three/behaviors/color';
import { computed, defineComponent, reactive, watchEffect } from 'vue';
import { degreesToRadians } from '@/app/utils/math';
import { DodecahedronGeometry, Group, IcosahedronGeometry, Matrix4, Mesh, MeshBasicMaterial, MeshLambertMaterial, Object3D, Quaternion, Vector3 } from 'three';
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
      // wireframe: props.wireframe,
    });

    const dodecahedron = new Mesh(geometry, material);

    dodecahedron.setRotationFromQuaternion(new Quaternion().setFromAxisAngle(
      new Vector3(1, 0, 0).normalize(), degreesToRadians(-144),
    ));

    watchEffect(() => {
      dodecahedron.scale.set(props.radius, props.radius, props.radius);
    });

    useColor(material, () => props.color);
    useDisposable(material);

    group.add(dodecahedron);

    useNesting(group);
    usePosition(group, () => props.position);
    useHidden(group, () => props.hidden);

    // scaled dodecahedron vertices
    const vertices = computed(() => {
      return dodecahedron.geometry.vertices.map(v => new Vector3().lerp(v, props.radius));
    });

    // slot positions
    const positions = computed(() => {
      const edgeLength = 4 * props.radius / (Math.sqrt(3) * (1 + Math.sqrt(5)));
      const circumradius = edgeLength / (2 * Math.sin(degreesToRadians(36)));
      const inradius = edgeLength / (2 * Math.tan(degreesToRadians(36)));
      const centerInterpolation = inradius / (circumradius + inradius);

      const center = (a: number, b: number, c: number) => new Vector3()
        .lerpVectors(vertices.value[b], vertices.value[c], 0.5)
        .lerp(vertices.value[a], centerInterpolation);

      return {
        u: center(17, 14, 18),
        l: center(15, 11, 12),
        f: center(18, 9, 11),
      };
    });

    // slot rotations
    const rotations = computed(() => {
      const orientation = (center: Vector3, upIndex: number) => new Quaternion()
        .setFromRotationMatrix(new Matrix4().lookAt(center, dodecahedron.position, vertices.value[upIndex]));

      return {
        u: orientation(positions.value.u, 17),
        l: orientation(positions.value.l, 15),
        f: orientation(positions.value.f, 18),
      }
    });
    
    // const rotations = computed(() => {
    //   return {
    //     l: new Quaternion().setFromRotationMatrix(
    //       new Matrix4().lookAt(
    //         positions.l, 
    //         dodecahedron.position,
    //         dodecahedron.geometry.vertices[15],
    //       ),
    //     ),
    //     // u: new Quaternion().setFromRotationMatrix(
    //     //   new Matrix4().lookAt(positions.u, dodecahedron.position, up),
    //     // ),
    //   };
    // });

    return {
      positions,
      rotations,
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
