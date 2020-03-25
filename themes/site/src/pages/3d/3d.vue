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
                            <!-- <template #U>
                                <v-box :position="{ x: -10, y: 10 }" :size="{ x: 5, y: 5 }" />
                            </template>
                            <template #L>
                                <v-box :position="{ x: -10, y: 10 }" :size="{ x: 5, y: 5 }" />
                            </template>
                            <template #F>
                                <v-box :position="{ x: -10, y: 10 }" :size="{ x: 5, y: 5 }" />
                            </template>
                            <template #R>
                                <v-box :position="{ x: -10, y: 10 }" :size="{ x: 5, y: 5 }" />
                            </template>
                            <template #B>
                                <v-box :position="{ x: -10, y: 10 }" :size="{ x: 5, y: 5 }" />
                            </template>
                            <template #D>
                                <v-box :position="{ x: -10, y: 10 }" :size="{ x: 5, y: 5 }" />
                            </template> -->
                        </v-box>
                    </v-scene>
                </div>

                <div class="flex max-w-sm mx-auto mb-12 text-center">
                    <div class="px-2">
                        Camera Angle
                        <v-range-input v-model.number="cameraAngle" :min="0" :max="90" />
                    </div>
                    <div class="px-2">
                        Camera Distance
                        <v-range-input v-model.number="cameraDistance" :min="0" :max="200" />
                    </div>
                </div>

                <div class="flex max-w-sm mx-auto mb-12 text-center">
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

                <div class="flex max-w-sm mx-auto mb-12 text-center">
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
import objectComponent from '@/components/three/object/object.vue';
import sceneComponent from '@/components/three/scene/scene.vue';

export default {
    data() {
        return {
            cameraAngle: 45,
            cameraDistance: 50,
            position: { x: 0, y: 0, z: 0 },
            size: { x: 25, y: 25, z: 25 },
        };
    },
    components: {
        'v-axes-helper': axesHelperComponent,
        'v-box': boxComponent,
        'v-object': objectComponent,
        'v-scene': sceneComponent,
    },
};
</script>
