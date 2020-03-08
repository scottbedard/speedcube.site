<template>
    <v-obj>
        <v-axes-helper />

        <v-shape
            v-for="(shape, index) in stickers"
            :geometry="shape"
            :inner-material="material"
            :key="index"
            :outer-material="material"
            :position="{
                x: 0,
                y: 0,
                z: 0,
            }"
        />
    </v-obj>
</template>

<script>
/* eslint-disable */
import axesHelperComponent from '@/components/three/axes_helper/axes_helper.vue';
import objComponent from '@/components/three/obj/obj.vue';
import shapeComponent from '@/components/three/shape/shape.vue';
import { midpoint, polygon, shape } from '@/app/utils/geometry';
import { DoubleSide, MeshLambertMaterial } from 'three';

export default {
    components: {
        'v-axes-helper': axesHelperComponent,
        'v-obj': objComponent,
        'v-shape': shapeComponent,
    },
    computed: {
        material() {
            return new MeshLambertMaterial({
                color: 0xffffff,
                opacity: 1,
                side: DoubleSide,
            });
        },
        stickers() {
            const { vertices } = polygon(100, 5);
            const [origin, a, b, c, d, e] = vertices;

            const radius = 0.5;

            return [
                shape([origin, midpoint(a, e), a, midpoint(a, b)], radius),
                shape([origin, midpoint(a, b), b, midpoint(b, c)], radius),
                shape([origin, midpoint(b, c), c, midpoint(c, d)], radius),
                shape([origin, midpoint(c, d), d, midpoint(d, e)], radius),
                shape([origin, midpoint(d, e), e, midpoint(e, a)], radius),
            ];
        },
    },
};
</script>
