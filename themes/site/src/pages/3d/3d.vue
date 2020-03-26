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
                                <v-face :scale="scale">
                                    <v-shape
                                        v-for="(sticker, index) in mega"
                                        :geometry="sticker.geometry"
                                        :inner-material="material"
                                        :key="index"
                                        :outer-material="material"
                                        :position="sticker.position"
                                    />
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
                    <div class="px-2">
                        Face Scaling
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
import { DoubleSide, Matrix4, MeshLambertMaterial } from 'three';
import axesHelperComponent from '@/components/three/axes_helper/axes_helper.vue';
import boxComponent from '@/components/three/geometries/box/box.vue';
import faceComponent from '@/components/three/face/face.vue';
import objectComponent from '@/components/three/object/object.vue';
import sceneComponent from '@/components/three/scene/scene.vue';
import shapeComponent from '@/components/three/shape/shape.vue';
import sphereComponent from '@/components/three/geometries/sphere/sphere.vue';
import { midpoint, polygon, shape } from '@/app/utils/geometry';

function anchoredShape(vertices, origin) {
    const geometry = shape(vertices, 0);
    const sub = origin.clone().sub(vertices[0]);

    geometry.translate(sub.x, sub.y, sub.z);

    const position = origin.clone();

    position.add(vertices[0]);

    return {
        geometry,
        position,
    }
}

export default {
    data() {
        return {
            cameraAngle: 0,
            cameraDistance: 35,
            position: { x: 0, y: 0, z: 0 },
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
            const outline = polygon(10, 5);

            const [origin, a, b, c, d, e] = outline.vertices;
            const [midAB, midBC, midCD, midDE, midEA] = [midpoint(a, b), midpoint(b, c), midpoint(c, d), midpoint(d, e), midpoint(e, a)];
            const [innerA, innerB, innerC, innerD, innerE] = [midpoint(e, b), midpoint(a, c), midpoint(b, d), midpoint(c, e), midpoint(d, a)];

            // the center will need to be scaled a larger size as spacing increases
            const center = shape([innerA, innerB, innerC, innerD, innerE], 0);

            return [
                anchoredShape([a, midAB, innerA, midEA], origin),
                anchoredShape([midAB, innerB, innerA], origin),
                anchoredShape([b, midBC, innerB, midAB], origin),
                anchoredShape([midBC, innerC, innerB], origin),
                anchoredShape([c, midCD, innerC, midBC], origin),
                anchoredShape([midCD, innerD, innerC], origin),
                anchoredShape([d, midDE, innerD, midCD], origin),
                anchoredShape([midDE, innerE, innerD], origin),
                anchoredShape([e, midEA, innerE, midDE], origin),
                anchoredShape([midEA, innerA, innerE], origin),
                { geometry: center, position: origin },
            ];
        },
    },
};
</script>
