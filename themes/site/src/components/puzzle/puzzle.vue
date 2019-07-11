<template>
    <div>
        <v-scene
            :camera-angle="cameraAngle"
            :camera-distance="cameraDistance">

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

            <!-- cube -->
            <v-cube
                :current-turn="currentTurn"
                :config="config"
                :turn-progress="turnProgress"
            />
        </v-scene>
    </div>
</template>

<script>
import Cube from 'bedard-cube';
import axesHelperComponent from '@/components/three/axes_helper/axes_helper.vue';
import cubeComponent from './cube/cube.vue';
import lightComponent from '@/components/three/light/light.vue';
import sceneComponent from '@/components/three/scene/scene.vue';
import { applyCubeState } from '@/app/utils/puzzle';
import { get } from 'lodash-es';

export default {
    beforeCreate() {
        this.$options.model = null;
    },
    created() {
        this.createModel();
    },
    components: {
        'v-axes-helper': axesHelperComponent,
        'v-cube': cubeComponent,
        'v-light': lightComponent,
        'v-scene': sceneComponent,
    },
    computed: {
        cameraAngle() {
            return get(this.config, 'cameraAngle', 0);
        },
        cameraDistance() {
            return get(this.config, 'cameraDistance', 100);
        },
        isCube() {
            return ['2x2', '3x3', '4x4', '5x5'].includes(this.type);
        },
    },
    methods: {
        createModel() {
            // cube
            if (this.isCube) {
                const size = parseInt(this.type);

                this.$options.model = new Cube(size, { useObjects: true });

                if (this.initialState) {
                    applyCubeState(this.$options.model, this.initialState);
                }
            }
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
        initialState: {
            type: String,
        },
        turnProgress: {
            default: 0,
            type: Number,
        },
        type: {
            default: '3x3',
            type: String,
        },
    },
};
</script>
