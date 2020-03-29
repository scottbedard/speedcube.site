<template>
    <v-dodecahedron
        :rotation="rotation"
        :size="size">
        <template #u>
            <v-object :position="elevatedPosition">
                <v-shape
                    v-for="(sticker, index) in megaminxShapes"
                    :geometry="sticker.geometry"
                    :inner-material="innerMaterial"
                    :key="index"
                    :outer-material="outerMaterial"
                    :position="sticker.position"
                />
            </v-object>
        </template>
        <template #f>
            <v-object
                :position="elevatedPosition"
                :rotation="{ z: 36 }">
                <v-shape
                    v-for="(sticker, index) in megaminxShapes"
                    :geometry="sticker.geometry"
                    :inner-material="innerMaterial"
                    :key="index"
                    :outer-material="outerMaterial"
                    :position="sticker.position"
                />
            </v-object>
        </template>
        <template #r>
            <v-object
                :position="elevatedPosition"
                :rotation="{ z: 40.5 }">
                <v-shape
                    v-for="(sticker, index) in megaminxShapes"
                    :geometry="sticker.geometry"
                    :inner-material="innerMaterial"
                    :key="index"
                    :outer-material="outerMaterial"
                    :position="sticker.position"
                />
            </v-object>
        </template>
        <template #l>
            <v-object
                :position="elevatedPosition"
                :rotation="{ z: 31.5 }">
                <v-shape
                    v-for="(sticker, index) in megaminxShapes"
                    :geometry="sticker.geometry"
                    :inner-material="innerMaterial"
                    :key="index"
                    :outer-material="outerMaterial"
                    :position="sticker.position"
                />
            </v-object>
        </template>
        <template #bl>
            <v-object
                :position="elevatedPosition"
                :rotation="{ z: 33.1 }">
                <v-shape
                    v-for="(sticker, index) in megaminxShapes"
                    :geometry="sticker.geometry"
                    :inner-material="innerMaterial"
                    :key="index"
                    :outer-material="outerMaterial"
                    :position="sticker.position"
                />
            </v-object>
        </template>
        <template #br>
            <v-object
                :position="elevatedPosition"
                :rotation="{ z: 38.9 }">
                <v-shape
                    v-for="(sticker, index) in megaminxShapes"
                    :geometry="sticker.geometry"
                    :inner-material="innerMaterial"
                    :key="index"
                    :outer-material="outerMaterial"
                    :position="sticker.position"
                />
            </v-object>
        </template>
        <!-- <template #dl>
            <v-object
                :position="elevatedPosition"
                :rotation="{ z: 0 }">
                <v-shape
                    v-for="(sticker, index) in megaminxShapes"
                    :geometry="sticker.geometry"
                    :inner-material="innerMaterial"
                    :key="index"
                    :outer-material="outerMaterial"
                    :position="sticker.position"
                />
            </v-object>
        </template> -->
    </v-dodecahedron>
</template>

<script>
import { clamp } from 'lodash-es';
import { BackSide, FrontSide, MeshLambertMaterial } from 'three';
import { intersect, midpoint, polygon, positionedShape } from '@/app/utils/geometry';
import dodecahedronComponent from '@/components/three/geometries/dodecahedron/dodecahedron.vue';
import objectComponent from '@/components/three/object/object.vue';
import shapeComponent from '@/components/three/shape/shape.vue';
import sphereComponent from '@/components/three/geometries/sphere/sphere.vue';

export default {
    components: {
        'v-dodecahedron': dodecahedronComponent,
        'v-object': objectComponent,
        'v-shape': shapeComponent,
        'v-sphere': sphereComponent,
    },
    computed: {
        /**
         * Elevate our faces along their local Z axis.
         *
         * @return {Object}
         */
        elevatedPosition() {
            return {
                z: this.normalizedConfig.stickerElevation,
            };
        },

        /**
         * Outer radius of each pentagonal face.
         *
         * @return {number}
         */
        faceRadius() {
            const edgeLength = 4 * this.size / (Math.sqrt(3) * (1 + Math.sqrt(5)));
            const circumcircleRadius = edgeLength / 10 * Math.sqrt(50 + (10 * Math.sqrt(5)));

            return this.size * (circumcircleRadius / this.size);
        },

        /**
         * Rotations to orient faces.
         *
         * @return {Object}
         */
        faceRotation() {
            const f = new Quaternion();

            return {
                f,
            };
        },

        innerMaterial() {
            return new MeshLambertMaterial({
                color: 0xff0000,
                opacity: 1,
                side: BackSide,
            });
        },

        outerMaterial() {
            return new MeshLambertMaterial({
                color: 0xffffff,
                opacity: 1,
                side: FrontSide,
            });
        },

        /**
         * Positioned shapes for megaminx.
         *
         * @return {Object[]}
         */
        megaminxShapes() {
            const { centerSize, stickerRadius, stickerSpacing } = this.normalizedConfig;

            const outline = polygon(this.faceRadius, 5);
            const cornerMid = clamp(0.5 - centerSize, 0, 0.5 - Number.EPSILON);
            const centerMid = clamp(0.5 + centerSize, 0.5 + Number.EPSILON, 1);
            const spacingRatio = 1 - stickerSpacing;

            // eslint-disable-next-line no-unused-vars
            const [origin, a, b, c, d, e] = outline.vertices;

            // outer corner points
            // ab = "a" corner, towards "b" corner
            const ab = midpoint(a, midpoint(a, b, cornerMid), spacingRatio);
            const ae = midpoint(a, midpoint(a, e, cornerMid), spacingRatio);
            const ba = midpoint(b, midpoint(b, a, cornerMid), spacingRatio);
            const bc = midpoint(b, midpoint(b, c, cornerMid), spacingRatio);
            const cb = midpoint(c, midpoint(c, b, cornerMid), spacingRatio);
            const cd = midpoint(c, midpoint(c, d, cornerMid), spacingRatio);
            const de = midpoint(d, midpoint(d, e, cornerMid), spacingRatio);
            const dc = midpoint(d, midpoint(d, c, cornerMid), spacingRatio);
            const ea = midpoint(e, midpoint(e, a, cornerMid), spacingRatio);
            const ed = midpoint(e, midpoint(e, d, cornerMid), spacingRatio);

            // inner corners points
            // ia = inner "a" corner
            const ia = intersect(ae, bc, ab, ed);
            const ib = intersect(ba, cd, bc, ae);
            const ic = intersect(cd, ba, cb, de);
            const id = intersect(dc, ea, de, cb);
            const ie = intersect(ea, dc, ed, ab);

            // outer middle points
            // maba = middle "ab", towards "a" corner
            const maba = midpoint(b, a, centerMid);
            const mabb = midpoint(a, b, centerMid);
            const mbcb = midpoint(c, b, centerMid);
            const mbcc = midpoint(b, c, centerMid);
            const mcdd = midpoint(c, d, centerMid);
            const mcdc = midpoint(d, c, centerMid);
            const mdee = midpoint(d, e, centerMid);
            const mded = midpoint(e, d, centerMid);
            const meaa = midpoint(e, a, centerMid);
            const meae = midpoint(a, e, centerMid);

            // inner middle points
            // imaba = inner middle "ab", towards "a" corner
            const imaba = intersect(maba, mdee, ae, bc);
            const imabb = intersect(mabb, mcdc, ae, bc);
            const imbcb = intersect(mbcb, meaa, ba, cd);
            const imbcc = intersect(mbcc, mded, ba, cd);
            const imcdc = intersect(mcdc, mabb, cb, de);
            const imcdd = intersect(mcdd, meae, cb, de);
            const imded = intersect(mded, mbcc, dc, ea);
            const imdee = intersect(mdee, maba, dc, ea);
            const imeaa = intersect(meaa, mbcb, ed, ab);
            const imeae = intersect(meae, mcdd, ed, ab);

            // center points
            // cia = center inner "a" corner
            const cia = intersect(meaa, mbcb, mdee, maba);
            const cib = intersect(meaa, mbcb, mabb, mcdc);
            const cic = intersect(mabb, mcdc, mbcc, mded);
            const cid = intersect(mcdd, meae, mbcc, mded);
            const cie = intersect(mcdd, meae, mdee, maba);

            return [
                positionedShape([a, ab, ia, ae], stickerRadius),
                positionedShape([mabb, imabb, imaba, maba], stickerRadius),
                positionedShape([b, bc, ib, ba], stickerRadius),
                positionedShape([mbcc, imbcc, imbcb, mbcb], stickerRadius),
                positionedShape([c, cd, ic, cb], stickerRadius),
                positionedShape([mcdd, imcdd, imcdc, mcdc], stickerRadius),
                positionedShape([d, de, id, dc], stickerRadius),
                positionedShape([mdee, imdee, imded, mded], stickerRadius),
                positionedShape([e, ea, ie, ed], stickerRadius),
                positionedShape([meaa, imeaa, imeae, meae], stickerRadius),
                positionedShape([cia, cib, cic, cid, cie], stickerRadius),
            ];
        },

        /**
         * Normalized configuration.
         *
         * @return {Object}
         */
        normalizedConfig() {
            return {
                centerSize: 0.1,
                stickerElevation: -1,
                stickerRadius: 0.2,
                stickerSpacing: 0.2,
                ...this.config,
            };
        },
    },
    props: {
        config: {
            type: Object,
        },
        rotation: {
            type: Object,
        },
        size: {
            type: Number,
        },
    },
};
</script>
