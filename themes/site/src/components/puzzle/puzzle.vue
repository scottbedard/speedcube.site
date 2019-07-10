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
                :intensity="0.8"
                :position="{ x: 0, y: 200, z: 200 }"
            />
            
            <v-light
                type="point"
                :color="0xffff00"
                :intensity="0.2"
                :position="{ x: 0, y: 200, z: 200 }"
            />
            
            <!-- cube -->
            <v-cube
                :current-turn="currentTurn"
                :config="config"
                :turn-progress="turnProgress / 100"
            />
        </v-scene>
    </div>
</template>

<script>
import axesHelperComponent from '@/components/three/axes_helper/axes_helper.vue';
import cubeComponent from './cube/cube.vue';
import lightComponent from '@/components/three/light/light.vue';
import sceneComponent from '@/components/three/scene/scene.vue';
import { get } from 'lodash-es';

export default {
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
    },
    methods: {
        // ...
    },
    props: {
        config: {
            default: () => ({}),
            type: Object,
        },
        currentTurn: {
            type: String,
        },
        turnProgress: {
            default: 0,
            type: Number,
        },
    },
};
</script>
