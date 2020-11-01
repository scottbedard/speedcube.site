<template>
  <v-group :rotation="defaultRotation">
    <v-group
      v-for="face in Object.keys(slots)"
      :key="face"
      :position="slots[face].position"
      :rotation="slots[face].rotation">
      <slot :name="face" />
      <v-sphere-geometry color="#f00" radius="0.05" wireframe />
    </v-group>

    <v-sphere-geometry
      color="#00f"
      :position="vertices[16]"
      :radius="0.05" />
  </v-group>
</template>

<script lang="ts">
import { colorProp, useColor } from '@/app/three/behaviors/color';
import { computed, defineComponent, watchEffect } from 'vue';
import { degreesToRadians } from '@/app/utils/math';
import { DodecahedronGeometry, Group, Matrix4, Mesh, MeshLambertMaterial, Quaternion, Vector3 } from 'three';
import { positionProp, usePosition } from '@/app/three/behaviors/position';
import { useDisposable } from '@/app/three/behaviors/disposable';
import { useHidden } from '@/app/three/behaviors/hidden';
import { useNesting } from '@/app/three/behaviors/nesting';
import VGroup from '@/components/three/utils/group.vue';
import VSphereGeometry from '@/components/three/geometries/sphere-geometry.vue';

// the dodecahedron mesh and slot positions need to be oriented from
// their default position to one where the U face is pointing up
const defaultRotation = new Quaternion().setFromAxisAngle(
  new Vector3(1, 0, 0).normalize(), degreesToRadians(-144),
);

// this object is used to position and orient slots. the first piece of the tuple
// defines the "up" orientation of that face, and the second two are the opposites
const faceMap: Record<string, [number, number, number]> = {
  u: [17, 14, 18],
  l: [15, 11, 12],
  f: [18, 9, 11],
  r: [5, 18, 8],
  br: [1, 17, 19],
  bl: [0, 15, 16],
};

// caching a few constants to avoid re-calculating when props changes
const circumradiusDenominator = 2 * Math.sin(degreesToRadians(36));
const edgeLengthDenominator = Math.sqrt(3) * (1 + Math.sqrt(5));
const inradiusDenominator = 2 * Math.tan(degreesToRadians(36));

export default defineComponent({
  setup(props) {
    const group = new Group();
    const matrix = new Matrix4();

    const geometry = new DodecahedronGeometry(1);

    const material = new MeshLambertMaterial({
      wireframe: props.wireframe,
    });

    const dodecahedron = new Mesh(geometry, material);

    dodecahedron.applyQuaternion(defaultRotation);

    useColor(material, () => props.color);
    useDisposable(material);

    group.add(dodecahedron);

    useNesting(group);
    usePosition(group, () => props.position);
    useHidden(group, () => props.hidden);

    // size the dodecahedron based on the radius. note that this scaling
    // does not effect slot content, as they are not descendent objects.
    watchEffect(() => {
      dodecahedron.scale.set(props.radius, props.radius, props.radius);
    });

    // scaled dodecahedron vertices
    const vertices = computed(() => {
      return dodecahedron.geometry.vertices.map(v => new Vector3().lerp(v, props.radius));
    });

    // slot position and rotations
    const slots = computed(() => {
      const edgeLength = (4 * props.radius) / edgeLengthDenominator;
      const circumradius = edgeLength / circumradiusDenominator;
      const inradius = edgeLength / inradiusDenominator;
      const centerInterpolation = inradius / (circumradius + inradius);

      return Object.keys(faceMap).reduce((acc: any, face: string) => {
        const [up, opposite1, opposite2] = faceMap[face];

        const position = new Vector3()
          .lerpVectors(vertices.value[opposite1], vertices.value[opposite2], 0.5)
          .lerp(vertices.value[up], centerInterpolation);
          
        const rotation = new Quaternion().setFromRotationMatrix(
          matrix.lookAt(position, dodecahedron.position, vertices.value[up]),
        );

        acc[face] = { position, rotation };

        return acc;
      }, {});
    });

    return {
      defaultRotation,
      slots,
      vertices,
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
