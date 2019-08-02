<template>
    <div>
        <v-scene
            :camera-angle="normalizedConfig.cameraAngle"
            :camera-distance="normalizedConfig.cameraDistance">

            <v-axes-helper :size="150" />

            <!-- lights -->
            <v-light
                type="ambient"
                :color="0xffffff"
                :intensity="0.5"
            />

            <v-light
                type="point"
                :color="0xffffff"
                :intensity="0.7"
                :position="{ x: 0, y: 2000, z: 2000 }"
            />

            <!-- cubes -->
            <v-cube
                :config="normalizedConfig"
                :current-turn="currentTurn"
                :model="model"
                :turn-progress="turnProgress"
            />
        </v-scene>
    </div>
</template>

<script>
import axesHelperComponent from '@/components/three/axes_helper/axes_helper.vue';
import lightComponent from '@/components/three/light/light.vue';
import sceneComponent from '@/components/three/scene/scene.vue';
import cubeComponent from './cube/cube.vue';

// default puzzle config
const defaultConfig = {
    cameraAngle: 50,
    cameraDistance: 215,
};

export default {
    components: {
        'v-axes-helper': axesHelperComponent,
        'v-cube': cubeComponent,
        'v-light': lightComponent,
        'v-scene': sceneComponent,
    },
    computed: {
        isCube() {
            return ['2x2', '3x3', '4x4', '5x5'].includes(this.type);
        },
        normalizedConfig() {
            return { ...defaultConfig, ...this.config };
        },
    },
    props: {
        config: {
            default: () => ({}),
            type: Object,
        },
        currentTurn: {
            type: String,
        },
        model: {
            required: true,
        },
        turnProgress: {
            default: 0,
            type: Number,
        },
        type: {
            default: '3x3',
            required: true,
            type: String,
        },
    },
};
</script>
