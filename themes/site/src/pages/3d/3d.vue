<template>
    <v-page padded>
        <v-margin padded>
            <h1 class="mb-12">3D Sandbox</h1>

            <div>
                <div class="max-w-md mx-auto mb-12">

                    <v-puzzle
                        debug
                        turn="R"
                        type="megaminx"
                        :camera-angle="cameraAngle"
                        :camera-distance="cameraDistance"
                        :config="config"
                        :rotation="rotation"
                        :size="100"
                        :turn-progress="turnProgress"
                    />

                    <!-- <v-scene
                        class="pb-full"
                        :camera-angle="cameraAngle"
                        :camera-distance="cameraDistance">
                        <v-axes-helper />
                        <v-ambient-light :intensity="0.8" :position="{ x: 200, z: 150 }" />
                        <v-point-light :intensity="0.8" :position="{ y: 150 }" />
                        
                        <v-dodecahedron
                            :position="position"
                            :rotation="rotation"
                            :size="size">
                            <template #u>
                                <v-shape
                                    v-for="(sticker, index) in mega"
                                    :geometry="sticker.geometry"
                                    :inner-material="innerMaterial"
                                    :key="index"
                                    :outer-material="outerMaterial"
                                    :position="sticker.position"
                                />
                                <v-sphere color="#ffffff" />
                            </template>
                        </v-dodecahedron>
                    </v-scene> -->
                </div>

                <div class="flex max-w-lg mb-6 mx-auto text-center">
                    <div class="flex-1 px-3">
                        <div>Camera angle</div>
                        <v-range-input v-model="cameraAngle" :min="0" :max="90" />
                    </div>
                    <div class="flex-1 px-3">
                        <div>Camera distance</div>
                        <v-range-input v-model="cameraDistance" :min="0" :max="500" />
                    </div>
                    <div class="flex-1 px-3">
                        <div>Turn progress</div>
                        <v-range-input v-model="cameraDistance" :min="0" :max="1" :step="0.01" />
                    </div>
                </div>

                <div class="flex max-w-lg mb-6 mx-auto text-center">
                    <div class="flex-1 px-3">
                        <div>Rotation X</div>
                        <v-range-input v-model="rotation.x" :min="-180" :max="180" />
                    </div>
                    <div class="flex-1 px-3">
                        <div>Rotation Y</div>
                        <v-range-input v-model="rotation.y" :min="-180" :max="180" />
                    </div>
                    <div class="flex-1 px-3">
                        <div>Rotation Z</div>
                        <v-range-input v-model="rotation.z" :min="-180" :max="180" />
                    </div>
                </div>

                <div class="flex max-w-lg mb-6 mx-auto text-center">
                    <div class="flex-1 px-3">
                        <div>Center</div>
                        <v-range-input v-model="config.centerSize" :min="0" :max="0.4" :step="0.01" />
                    </div>
                    <div class="flex-1 px-3">
                        <div>Spacing</div>
                        <v-range-input v-model="config.stickerSpacing" :min="0" :max="0.5" :step="0.01" />
                    </div>
                    <div class="flex-1 px-3">
                        <div>Elevation</div>
                        <v-range-input v-model="config.stickerElevation" :min="0" :max="100" :step="1" />
                    </div>
                    <div class="flex-1 px-3">
                        <div>Radius</div>
                        <v-range-input v-model="config.stickerRadius" :min="0" :max="0.5" :step="0.01" />
                    </div>
                </div>

                <pre class="text-xs max-w-sm mx-auto">{{ $data }}</pre>
            </div>
        </v-margin>
    </v-page>
</template>

<script>
import { clamp } from 'lodash-es';
import ambientLightComponent from '@/components/three/ambient_light/ambient_light.vue';
import axesHelperComponent from '@/components/three/axes_helper/axes_helper.vue';
import dodecahedronComponent from '@/components/three/geometries/dodecahedron/dodecahedron.vue';
import pointLightComponent from '@/components/three/point_light/point_light.vue';
import sceneComponent from '@/components/three/scene/scene.vue';
import shapeComponent from '@/components/three/shape/shape.vue';
import sphereComponent from '@/components/three/geometries/sphere/sphere.vue';
import { intersect, midpoint, polygon, positionedShape } from '@/app/utils/geometry';
import puzzleComponent from '@/components/puzzle/puzzle.vue';

export default {
    data() {
        return {
            cameraAngle: 35,
            cameraDistance: 400,
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            turnProgress: 0,
            config: {
                centerSize: 0.05,
                stickerRadius: 0,
                stickerSpacing: 0.2,
                stickerElevation: 0,
            },
        };
    },
    components: {
        'v-ambient-light': ambientLightComponent,
        'v-axes-helper': axesHelperComponent,
        'v-dodecahedron': dodecahedronComponent,
        'v-point-light': pointLightComponent,
        'v-puzzle': puzzleComponent,
        'v-scene': sceneComponent,
        'v-shape': shapeComponent,
        'v-sphere': sphereComponent,
    },
    computed: {
        mega() {
            const cornerMid = clamp(0.5 - this.mid, 0, 0.5 - Number.EPSILON);
            const centerMid = clamp(0.5 + this.mid, 0.5 + Number.EPSILON, 1);
            const gapRatio = 1 - this.gap;
            const outline = polygon(this.size / 2, 5);
            const [origin, a, b, c, d, e] = outline.vertices;

            // outer corner points
            // ab = "a" corner, towards "b" corner
            const ab = midpoint(a, midpoint(a, b, cornerMid), gapRatio);
            const ae = midpoint(a, midpoint(a, e, cornerMid), gapRatio);
            const ba = midpoint(b, midpoint(b, a, cornerMid), gapRatio);
            const bc = midpoint(b, midpoint(b, c, cornerMid), gapRatio);
            const cb = midpoint(c, midpoint(c, b, cornerMid), gapRatio);
            const cd = midpoint(c, midpoint(c, d, cornerMid), gapRatio);
            const de = midpoint(d, midpoint(d, e, cornerMid), gapRatio);
            const dc = midpoint(d, midpoint(d, c, cornerMid), gapRatio);
            const ea = midpoint(e, midpoint(e, a, cornerMid), gapRatio);
            const ed = midpoint(e, midpoint(e, d, cornerMid), gapRatio);

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
                positionedShape([a, ab, ia, ae], this.radius),
                positionedShape([mabb, imabb, imaba, maba], this.radius),
                positionedShape([b, bc, ib, ba], this.radius),
                positionedShape([mbcc, imbcc, imbcb, mbcb], this.radius),
                positionedShape([c, cd, ic, cb], this.radius),
                positionedShape([mcdd, imcdd, imcdc, mcdc], this.radius),
                positionedShape([d, de, id, dc], this.radius),
                positionedShape([mdee, imdee, imded, mded], this.radius),
                positionedShape([e, ea, ie, ed], this.radius),
                positionedShape([meaa, imeaa, imeae, meae], this.radius),
                positionedShape([cia, cib, cic, cid, cie], this.radius),
            ];
        },
    },
};
</script>
