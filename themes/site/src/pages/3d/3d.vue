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
                                    <v-sphere color="f00" :position="{ x: -5, y: 5 }" />
                                    <v-sphere color="f00" :position="{ x: 0, y: 5 }" />
                                    <v-sphere color="f00" :position="{ x: 5, y: 5 }" />
                                    <v-sphere color="f00" :position="{ x: -5, y: 0 }" />
                                    <v-sphere color="f00" :position="{ x: 0, y: 0 }" />
                                    <v-sphere color="f00" :position="{ x: 5, y: 0 }" />
                                    <v-sphere color="f00" :position="{ x: -5, y: -5 }" />
                                    <v-sphere color="f00" :position="{ x: 0, y: -5 }" />
                                    <v-sphere color="f00" :position="{ x: 5, y: -5 }" />
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
import axesHelperComponent from '@/components/three/axes_helper/axes_helper.vue';
import boxComponent from '@/components/three/geometries/box/box.vue';
import faceComponent from '@/components/three/face/face.vue';
import objectComponent from '@/components/three/object/object.vue';
import sceneComponent from '@/components/three/scene/scene.vue';
import sphereComponent from '@/components/three/geometries/sphere/sphere.vue';

export default {
    data() {
        return {
            cameraAngle: 45,
            cameraDistance: 50,
            position: { x: 0, y: 0, z: 0 },
            scale: 1,
            size: { x: 25, y: 25, z: 25 },
        };
    },
    components: {
        'v-axes-helper': axesHelperComponent,
        'v-box': boxComponent,
        'v-face': faceComponent,
        'v-object': objectComponent,
        'v-scene': sceneComponent,
        'v-sphere': sphereComponent,
    },
};
</script>
