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

                <v-puzzle
                    type="cube"
                    :config="config"
                    :model="model"
                />
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
                            :max="500"
                        />
                    </v-grid-cell>
                    <v-grid-cell md="6">
                        <label>Sticker Radius</label>
                        <v-range-input
                            v-model="config.stickerRadius"
                            :min="0"
                            :max="0.5"
                            :step="0.01"
                        />
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
            cameraAngle: 60,
            cameraDistance: 150,
            config: {
                stickerRadius: 0.2,
            },
            model: new Cube({ size: 3 }),
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
