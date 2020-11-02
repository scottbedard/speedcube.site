<template>
  <v-shape
    :geometry="cornerGeometry"
    :inner-material="material"
    :outer-material="material" />
</template>

<script lang="ts">
/* eslint-disable */
import { BackSide, CircleGeometry, DoubleSide, FrontSide, Material, MeshLambertMaterial } from 'three';
import { defineComponent, computed, watch } from 'vue';
import { bilerp, degreesToRadians } from '@/app/utils/math';
import { dodecahedronEdgeLength, pentagonCircumradius, pentagonInradius, polygon } from '@/app/utils/geometry';
import { useDisposable } from '@/app/three/behaviors/disposable';
import { useGeometry } from '@/app/three/behaviors/geometry';
import VGroup from '@/components/three/utils/group.vue';
import VShape from '@/components/three/utils/shape.vue';
import { Polygon, Vector2 } from '@/types/math';

const origin: Vector2 = [0, 0];

export default defineComponent({
  setup(props) {
    const edgeLength = computed(() => dodecahedronEdgeLength(props.radius, 'circumRadius'));
    const inradius = computed(() => pentagonInradius(edgeLength.value, 'edgeLength'));
    const circumradius = computed(() => pentagonCircumradius(edgeLength.value, 'edgeLength'));

    const pentagon = computed(() => polygon(5, circumradius.value));

    const cornerPerimeter = computed(() => {
      const [v1, v2, v3, v4, v5] = pentagon.value;

      return [v1, bilerp(v1, v2, 0.5), origin, bilerp(v5, v1, 0.5)] as Polygon;
    });
    
    const cornerGeometry = useGeometry(cornerPerimeter);

    const material = new MeshLambertMaterial({
      color: 0xff0000,
      side: DoubleSide,
    });

    useDisposable(material);

    return {
      cornerGeometry,
      material,
    };
  },
  components: {
    VGroup,
    VShape,
  },
  props: {
    radius: {
      default: 1,
      type: Number,
    },
  }
});
</script>
