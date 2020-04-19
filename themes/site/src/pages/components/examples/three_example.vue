<template>
    <v-example title="three">
        <p>
            These are some of our low-level 3D rendering components,
            which are used to construct the higher-level puzzle components.
        </p>

        <div class="my-8">

            <!--
                scenes are absolutely positioned and completely fill their
                containers. these wrapper elements simply turn the scene
                into a responsive square.
            -->
            <div class="max-w-xs mx-auto">
                <div class="border-4 border-dotted border-grey-4 pb-full relative">
                    <v-scene
                        :camera-angle="cameraAngle"
                        :camera-distance="cameraDistance">

                        <v-axes-helper :size="150" />

                        <!-- lights -->
                        <v-light
                            type="ambient"
                            :color="0xffffff"
                            :intensity="0.8"
                            :position="{ x: 0, y: 200, z: 200 }"
                        />

                        <v-light
                            type="point"
                            :color="0xffff00"
                            :intensity="0.2"
                            :position="{ x: 0, y: 200, z: 200 }"
                        />

                        <!-- action -->
                        <v-box
                            :color="0xffff00"
                            :position="position"
                            :size="50"
                        />
                    </v-scene>
                </div>
            </div>
        </div>

        <div class="max-w-sm mx-auto">
            <div class="mb-4">
                <label class="mb-1 text-grey-7 tracking-wide text-xs uppercase">Camera Angle</label>
                <v-range-input v-model="cameraAngle" :min="0" :max="90" />
            </div>
            <div class="mb-4">
                <label class="mb-1 text-grey-7 tracking-wide text-xs uppercase">Camera Distance</label>
                <v-range-input v-model="cameraDistance" :min="0" :max="200" />
            </div>
            <div>
                <label class="mb-1 text-grey-7 tracking-wide text-xs uppercase">Object Position</label>
                <v-range-input v-model="position.x" :min="-50" :max="50" /><br />
                <v-range-input v-model="position.y" :min="-50" :max="50" /><br />
                <v-range-input v-model="position.z" :min="-50" :max="50" />
            </div>
        </div>
    </v-example>
</template>

<script>
import axesHelperComponent from '@/components/three_old/axes_helper/axes_helper.vue';
import boxComponent from '@/components/three_old/box/box.vue';
import exampleComponent from '../example.vue';
import lightComponent from '@/components/three_old/light/light.vue';
import sceneComponent from '@/components/three_old/scene/scene.vue';
import shapeComponent from '@/components/three_old/shape/shape.vue';

export default {
    components: {
        'v-axes-helper': axesHelperComponent,
        'v-box': boxComponent,
        'v-example': exampleComponent,
        'v-light': lightComponent,
        'v-scene': sceneComponent,
        'v-shape': shapeComponent,
    },
    data() {
        return {
            cameraAngle: 55,
            cameraDistance: 100,
            position: {
                x: 0,
                y: 0,
                z: 0,
            },
        };
    },
};
</script>
