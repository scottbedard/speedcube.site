<template>
    <v-obj>
        <v-axes-helper />

        <template v-if="config.size === 2">
            <v-obj
                v-for="(shape, index) in 5"
                :key="index"
                :rotation="{
                    z: 72 * -index,
                }">
                <v-shape
                    :geometry="kiloGeometry"
                    :inner-material="material"
                    :key="index"
                    :outer-material="material"
                    :position="{
                        x: 0,
                        y: config.stickerSpacing,
                        z: 0,
                    }"
                />
            </v-obj>
        </template>

        <template v-else-if="config.size === 3">
            <v-shape
                v-for="(shape, index) in megaStickers"
                :geometry="shape"
                :inner-material="material"
                :key="index"
                :outer-material="material"
            />
        </template>

        <v-shape
            :geometry="g2"
            :inner-material="m2"
            :outer-material="m2"
            :position="p2"
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
        g2() {
            return polygon(5, 10);
        },
        m2() {
            return new MeshLambertMaterial({
                color: 0xff0000,
                side: DoubleSide,
            });
        },
        p2() {
            const { vertices } = polygon(100, 5);
            const [origin, a, b, c, d, e] = vertices;

            return midpoint(a, b, 0.5);
        },
        material() {
            return new MeshLambertMaterial({
                color: 0xffffff,
                opacity: 1,
                side: DoubleSide,
            });
        },
        megaStickers() {
            const outline = polygon(100, 5);
            const [origin, a, b, c, d, e] = outline.vertices;

            return [
                // outline,
                shape([a, midpoint(a, b), midpoint(b, e), midpoint(e, a)], this.config.stickerRadius),
                shape([midpoint(a, b), midpoint(a, c), midpoint(b, e)], this.config.stickerRadius),
                shape([midpoint(a, b), b, midpoint(b, c), midpoint(a, c)], this.config.stickerRadius),
                shape([midpoint(b, c), midpoint(b, d), midpoint(a, c)], this.config.stickerRadius),
                shape([midpoint(b, c), c, midpoint(c, d), midpoint(b, d)], this.config.stickerRadius),
                shape([midpoint(c, d), midpoint(c, e), midpoint(b, d)], this.config.stickerRadius),
                shape([midpoint(c, d), d, midpoint(d, e), midpoint(c, e)], this.config.stickerRadius),
                shape([midpoint(d, e), midpoint(d, a), midpoint(c, e)], this.config.stickerRadius),
                shape([midpoint(d, e), e, midpoint(e, a), midpoint(a, d)], this.config.stickerRadius),
                shape([midpoint(e, a), midpoint(b, e), midpoint(a, d)], this.config.stickerRadius),
                shape([midpoint(e, b), midpoint(a, c), midpoint(b, d), midpoint(c, e), midpoint(d, a)], this.config.stickerRadius),
            ];
        },
        kiloGeometry() {
            const [origin, a, b, c, d, e] = polygon(100, 5).vertices;

            return shape([
                origin,
                midpoint(a, e),
                a,
                midpoint(a, b)
            ], this.config.stickerRadius);
        },
    },
    props: [
        'config',
    ],
};
</script>
