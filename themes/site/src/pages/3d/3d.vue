<template>
    <v-page padded>
        <v-margin padded>
            <button @click="visible = !visible">toggle: {{ visible }}</button>

            <v-scene
                v-if="visible"
                class="max-w-md mx-auto"
                :camera-angle="cameraAngle"
                :camera-distance="cameraDistance">
                <div class="pb-full" />

                <v-axes-helper />

                <v-box :position="position" :size="size">
                    <template #u>
                        <v-sphere color="#0f0" />
                    </template>
                    <template #l>
                        <v-sphere color="#ff0" />
                    </template>
                    <template #f>
                        <v-sphere color="#0ff" />
                    </template>
                    <template #r>
                        <v-sphere color="#f00" />
                    </template>
                    <template #b>
                        <v-sphere color="#00f" />
                    </template>
                    <template #d>
                        <v-sphere color="#f0f" />
                    </template>
                </v-box>

                <!-- <v-puzzle
                    type="3x3"
                    :model="model"
                /> -->
            </v-scene>

            <div class="max-w-2xl mt-12 mx-auto">
                <v-grid padded>
                    <v-grid-cell md="6">
                        <label>Camera Angle</label>
                        <v-range-input
                            v-model="cameraAngle"
                            :min="0"
                            :max="90"
                        />
                    </v-grid-cell>
                    <v-grid-cell md="6">
                        <label>Camera Distance</label>
                        <v-range-input
                            v-model="cameraDistance"
                            :min="0"
                            :max="100"
                        />
                    </v-grid-cell>

                    <v-grid-cell md="4">
                        <label>Width</label>
                        <v-range-input v-model="size.x" :min="0" :max="100" />
                    </v-grid-cell>
                    <v-grid-cell md="4">
                        <label>Height</label>
                        <v-range-input v-model="size.y" :min="0" :max="100" />
                    </v-grid-cell>
                    <v-grid-cell md="4">
                        <label>Depth</label>
                        <v-range-input v-model="size.z" :min="0" :max="100" />
                    </v-grid-cell>

                    <v-grid-cell md="4">
                        <label>X</label>
                        <v-range-input v-model="position.x" :min="-100" :max="100" />
                    </v-grid-cell>
                    <v-grid-cell md="4">
                        <label>Y</label>
                        <v-range-input v-model="position.y" :min="-100" :max="100" />
                    </v-grid-cell>
                    <v-grid-cell md="4">
                        <label>Z</label>
                        <v-range-input v-model="position.z" :min="-100" :max="100" />
                    </v-grid-cell>
                </v-grid>
            </div>

            <div style="border: 4px dashed green; height: 2000px; margin: 4rem" />
        </v-margin>
    </v-page>
</template>

<script>
import { Cube } from '@bedard/twister';
import axesHelperComponent from '@/components/three/axes_helper/axes_helper.vue';
import boxComponent from '@/components/three/geometries/box/box.vue';
import puzzleComponent from '@/components/puzzle/puzzle.vue';
import sceneComponent from '@/components/three/scene/scene.vue';
import sphereComponent from '@/components/three/geometries/sphere/sphere.vue';

export default {
    data() {
        return {
            cameraAngle: 70,
            cameraDistance: 50,
            model: new Cube({ size: 3 }),
            position: { x: 0, y: 0, z: 0 },
            size: { x: 10, y: 10, z: 10 },
            visible: true,
        };
    },
    components: {
        'v-axes-helper': axesHelperComponent,
        'v-box': boxComponent,
        'v-puzzle': puzzleComponent,
        'v-scene': sceneComponent,
        'v-sphere': sphereComponent,
    },
};
</script>
