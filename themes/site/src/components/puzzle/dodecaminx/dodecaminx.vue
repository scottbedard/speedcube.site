<template>
    <v-dodecahedron
        :quaternion-axis="'l'"
        :quaternion-rotation="turnProgress * -72"
        :rotation="rotation"
        :size="size">
        <template v-for="face in Object.keys(faces)" v-slot:[face]>
            <v-object
                :key="face"
                :position="{ z: normalizedConfig.stickerElevation }"
                :rotation="faces[face]">
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
    </v-dodecahedron>
</template>

<script>
import { clamp, stubObject } from 'lodash-es';
import { BackSide, FrontSide, MeshLambertMaterial } from 'three';
import { Dodecaminx } from '@bedard/twister';
import { intersect, midpoint, polygon, positionedShape } from '@/app/utils/geometry';
import dodecahedronComponent from '@/components/three/geometries/dodecahedron/dodecahedron.vue';
import objectComponent from '@/components/three/object/object.vue';
import shapeComponent from '@/components/three/shape/shape.vue';
import sphereComponent from '@/components/three/geometries/sphere/sphere.vue';

export default {
    created() {
        this.model = new Dodecaminx(this.normalizedOptions);

        console.log(this.model);
    },
    data() {
        return {
            model: null,
        };
    },
    components: {
        'v-dodecahedron': dodecahedronComponent,
        'v-object': objectComponent,
        'v-shape': shapeComponent,
        'v-sphere': sphereComponent,
    },
    computed: {
        /**
         * Faces.
         *
         * @return {Object}
         */
        faces() {
            return {
                u: {},
                f: { z: 36 },
                l: { z: 36 },
                r: { z: 36 },
                bl: { z: 36 },
                br: { z: 36 },
                dl: { z: 216 },
                dr: { z: 216 },
                dbl: { z: 216 },
                dbr: { z: 216 },
                b: { z: 216 },
                d: {},
            };
        },

        innerMaterial() {
            return new MeshLambertMaterial({
                color: 0x333333,
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

            const outline = polygon(this.size, 5);
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

        /**
         * Normalized options.
         *
         * @return {Object}
         */
        normalizedOptions() {
            return {
                size: 3,
                ...this.options,
            };
        },
    },
    props: {
        config: {
            default: stubObject,
            type: Object,
        },
        optiioins: {
            default: stubObject,
            type: Object,
        },
        rotation: {
            type: Object,
        },
        size: {
            type: Number,
        },
        turnProgress: {
            type: Number,
        },
        turn: {
            type: String,
        },
        type: {
            type: String,
        },
    },
};
</script>
