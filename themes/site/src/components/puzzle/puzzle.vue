<template>
    <div>
        <!-- scene -->
        <v-scene
            :camera-angle="normalizedConfig.cameraAngle"
            :camera-distance="normalizedConfig.cameraDistance">

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

            <!-- minx -->
            <v-minx
                v-if="isMinx"
            />

            <!-- cubes -->
            <v-cube
                v-else-if="isCube"
                :config="normalizedConfig"
                :current-turn="currentTurn"
                :initial-state="initialState"
                :masked="masked"
                :model="model"
                :turn-progress="turnProgress"
                :type="type"
            />
        </v-scene>
    </div>
</template>

<script>
import lightComponent from '@/components/three/light/light.vue';
import sceneComponent from '@/components/three/scene/scene.vue';
import cubeComponent from './cube/cube.vue';
import minxComponent from './minx/minx.vue';

// default puzzle config
const defaultConfig = {
    cameraAngle: 50,
    cameraDistance: 215,
};

export default {
    components: {
        'v-cube': cubeComponent,
        'v-light': lightComponent,
        'v-minx': minxComponent,
        'v-scene': sceneComponent,
    },
    computed: {
        isCube() {
            return ['2x2', '3x3', '4x4', '5x5'].includes(this.type);
        },
        isMinx() {
            return ['minx2', 'minx3', 'minx4', 'minx5'].includes(this.type);
        },
        normalizedConfig() {
            const config = typeof this.config === 'string'
                ? JSON.parse(this.config)
                : this.config;

            return { ...defaultConfig, ...config };
        },
    },
    props: {
        config: {
            default: () => ({}),
            type: [Object, String],
        },
        currentTurn: {
            type: String,
        },
        initialState: {
            type: [Object, String],
        },
        masked: {
            default: false,
            type: Boolean,
        },
        model: {
            type: Object,
        },
        turnable: {
            default: false,
            type: Boolean,
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
