<template>
    <v-page padded>
        <v-margin padded>
            <h1 class="mb-12">3D Sandbox</h1>

            <div style="padding-bottom: 2000px">
                <div class="max-w-md mx-auto mb-12">
                    <v-scene
                        class="pb-full"
                        :camera-angle="cameraAngle"
                        :camera-distance="cameraDistance">
                        <v-axes-helper />

                        <v-box :position="position" :size="size">
                            <template #u>
                                <v-shape
                                    v-for="(sticker, index) in mega"
                                    :geometry="sticker.geometry"
                                    :inner-material="material"
                                    :key="index"
                                    :outer-material="material"
                                    :position="sticker.position"
                                />
                                    
                                <v-face :scale="scale">
                                    <v-sphere color="f00" :radius="0.25" :position="{ x: -5, y: 5 }" />
                                    <v-sphere color="f00" :radius="0.25" :position="{ x: 0, y: 5 }" />
                                    <v-sphere color="f00" :radius="0.25" :position="{ x: 5, y: 5 }" />
                                    <v-sphere color="f00" :radius="0.25" :position="{ x: -5, y: 0 }" />
                                    <v-sphere color="f00" :radius="0.25" :position="{ x: 0, y: 0 }" />
                                    <v-sphere color="f00" :radius="0.25" :position="{ x: 5, y: 0 }" />
                                    <v-sphere color="f00" :radius="0.25" :position="{ x: -5, y: -5 }" />
                                    <v-sphere color="f00" :radius="0.25" :position="{ x: 0, y: -5 }" />
                                    <v-sphere color="f00" :radius="0.25" :position="{ x: 5, y: -5 }" />
                                </v-face>
                            </template>
                            <template #l>
                                <v-sphere color="ff0" />
                            </template>
                            <template #f>
                                <v-sphere color="fff" />
                            </template>
                            <template #r>
                                <v-sphere color="0ff" />
                            </template>
                            <template #b>
                                <v-sphere color="00f" />
                            </template>
                            <template #d>
                                <v-sphere color="f0f" />
                            </template>
                        </v-box>
                    </v-scene>
                </div>

                <div class="flex max-w-md mx-auto mb-8 text-center">
                    <div class="px-2">
                        Camera Angle
                        <v-range-input v-model.number="cameraAngle" :min="0" :max="90" />
                    </div>
                    <div class="px-2">
                        Camera Distance
                        <v-range-input v-model.number="cameraDistance" :min="0" :max="200" />
                    </div>
                </div>
                <div class="flex max-w-md mx-auto mb-8 text-center">
                    <div class="px-2">
                        Mid
                        <v-range-input v-model.number="mid" :min="0" :max="0.49" :step="0.01" />
                    </div>
                    <div class="px-2">
                        Gap
                        <v-range-input v-model.number="gap" :min="0" :max="1" :step="0.01" />
                    </div>
                    <div class="px-2">
                        Scale
                        <v-range-input v-model.number="scale" :min="1" :max="3" :step="0.01" />
                    </div>
                </div>

                <div class="flex max-w-sm mx-auto mb-8 text-center">
                    <div class="px-2">
                        X
                        <v-range-input v-model.number="position.x" :min="-50" :max="50" />
                    </div>
                    <div class="px-2">
                        Y
                        <v-range-input v-model.number="position.y" :min="-50" :max="50" />
                    </div>
                    <div class="px-2">
                        Z
                        <v-range-input v-model.number="position.z" :min="-50" :max="50" />
                    </div>
                </div>

                <div class="flex max-w-sm mx-auto mb-8 text-center">
                    <div class="px-2">
                        X
                        <v-range-input v-model.number="size.x" :min="0" :max="50" />
                    </div>
                    <div class="px-2">
                        Y
                        <v-range-input v-model.number="size.y" :min="0" :max="50" />
                    </div>
                    <div class="px-2">
                        Z
                        <v-range-input v-model.number="size.z" :min="0" :max="50" />
                    </div>
                </div>

                <pre class="text-xs max-w-sm mx-auto">{{ $data }}</pre>
            </div>
        </v-margin>
    </v-page>
</template>

<script>
import { clamp } from 'lodash-es';
import { DoubleSide, MeshLambertMaterial } from 'three';
import axesHelperComponent from '@/components/three/axes_helper/axes_helper.vue';
import boxComponent from '@/components/three/geometries/box/box.vue';
import faceComponent from '@/components/three/face/face.vue';
import objectComponent from '@/components/three/object/object.vue';
import sceneComponent from '@/components/three/scene/scene.vue';
import shapeComponent from '@/components/three/shape/shape.vue';
import sphereComponent from '@/components/three/geometries/sphere/sphere.vue';
import { intersect, midpoint, polygon, positionedShape } from '@/app/utils/geometry';

export default {
    data() {
        return {
            cameraAngle: 0,
            cameraDistance: 35,
            position: { x: 0, y: 0, z: 0 },
            gap: 0.9,
            mid: 0.1,
            scale: 1.2,
            size: { x: 25, y: 25, z: 25 },
            stickerRadius: 0,
        };
    },
    components: {
        'v-axes-helper': axesHelperComponent,
        'v-box': boxComponent,
        'v-face': faceComponent,
        'v-object': objectComponent,
        'v-scene': sceneComponent,
        'v-shape': shapeComponent,
        'v-sphere': sphereComponent,
    },
    computed: {
        material() {
            return new MeshLambertMaterial({
                color: 0xffffff,
                opacity: 1,
                side: DoubleSide,
            });
        },
        mega() {
            const cornerMid = clamp(0.5 - this.mid, 0, 0.5 - Number.EPSILON);
            const centerMid = clamp(0.5 + this.mid, 0.5 + Number.EPSILON, 1);
            const outline = polygon(10 * this.scale, 5);
            const [origin, a, b, c, d, e] = outline.vertices;

            // outer corner points
            // ab = "a" corner, towards "b" corner
            const ab = midpoint(a, midpoint(a, b, cornerMid), this.gap);
            const ae = midpoint(a, midpoint(a, e, cornerMid), this.gap);
            const ba = midpoint(b, midpoint(b, a, cornerMid), this.gap);
            const bc = midpoint(b, midpoint(b, c, cornerMid), this.gap);
            const cb = midpoint(c, midpoint(c, b, cornerMid), this.gap);
            const cd = midpoint(c, midpoint(c, d, cornerMid), this.gap);
            const de = midpoint(d, midpoint(d, e, cornerMid), this.gap);
            const dc = midpoint(d, midpoint(d, c, cornerMid), this.gap);
            const ea = midpoint(e, midpoint(e, a, cornerMid), this.gap);
            const ed = midpoint(e, midpoint(e, d, cornerMid), this.gap);

            // inner corners points
            // ia = inner "a" corner
            const ia = intersect(ae, bc, ab, ed);
            const ib = intersect(ba, cd, bc, ae);
            const ic = intersect(cd, ba, cb, de);
            const id = intersect(dc, ea, de, cb);
            const ie = intersect(ea, dc, ed, ab);

            // outer middle points
            // mab = middle "ab"
            // maba = middle "ab", towards "a" corner
            const mab = midpoint(a, b);
            const maba = midpoint(b, a, centerMid);
            const mabb = midpoint(a, b, centerMid);
            const mbc = midpoint(b, c);
            const mbcb = midpoint(c, b, centerMid);
            const mbcc = midpoint(b, c, centerMid);
            const mcd = midpoint(c, d);
            const mcdd = midpoint(c, d, centerMid);
            const mcdc = midpoint(d, c, centerMid);
            const mde = midpoint(d, e);
            const mdee = midpoint(d, e, centerMid);
            const mded = midpoint(e, d, centerMid);
            const mea = midpoint(e, a);
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
                positionedShape([a, ab, ia, ae]),
                positionedShape([mab, mabb, imabb, imaba, maba]),
                positionedShape([b, bc, ib, ba]),
                positionedShape([mbc, mbcc, imbcc, imbcb, mbcb]),
                positionedShape([c, cd, ic, cb]),
                positionedShape([mcd, mcdd, imcdd, imcdc, mcdc]),
                positionedShape([d, de, id, dc]),
                positionedShape([mde, mdee, imdee, imded, mded]),
                positionedShape([e, ea, ie, ed]),
                positionedShape([mea, meaa, imeaa, imeae, meae]),
                positionedShape([cia, cib, cic, cid, cie]),
            ];
        },
    },
};
</script>
