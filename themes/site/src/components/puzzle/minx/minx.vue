<template>
    <v-obj>
        <v-axes-helper />

        <v-shape
            v-for="(shape, index) in megaStickers"
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

        <!-- <v-shape
            :geometry="g2"
            :inner-material="m2"
            :outer-material="m2"
            :position="p2"
        /> -->
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
        // g2() {
        //     return polygon(3, 100); // circle w/ radius 5
        // },
        // m2() {
        //     return new MeshLambertMaterial({
        //         color: 0xff0000,
        //         opacity: 1,
        //         side: DoubleSide,
        //     });
        // },
        // p2() {
        //     const { vertices } = polygon(100, 5);
        //     const [origin, a, b, c, d, e] = vertices;

        //     return midpoint(a, b);
        // },
        material() {
            return new MeshLambertMaterial({
                color: 0xffffff,
                opacity: 1,
                side: DoubleSide,
            });
        },
        megaStickers() {
            const center = polygon(60, 5);
            const [_, ca, cb, cc, cd, ce] = center.vertices;

            const { vertices } = polygon(110, 5);
            const [origin, a, b, c, d, e] = vertices;

            const radius = 0.2;

            return [
                center,
                shape([midpoint(e, a, 2/3), a, midpoint(a, b, 1/3), ca], radius),
                shape([midpoint(a, b, 1/3), midpoint(a, b, 2/3), cb, ca], radius),
                shape([midpoint(a, b, 2/3), b, midpoint(b, c, 1/3), cb], radius),
                shape([midpoint(b, c, 1/3), midpoint(b, c, 2/3), cc, cb], radius),
                shape([midpoint(b, c, 2/3), c, midpoint(c, d, 1/3), cc], radius)
            ];
        },
        kiloStickers() {
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
