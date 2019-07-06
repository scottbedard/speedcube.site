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
            <v-cube />
        </v-scene>
    </div>
</template>

<script>
import axesHelperComponent from '@/components/three/axes_helper/axes_helper.vue';
import cubeComponent from './cube/cube.vue';
import lightComponent from '@/components/three/light/light.vue';
import sceneComponent from '@/components/three/scene/scene.vue';

export default {
    data() {
        return {
            cameraAngle: 55,
            cameraDistance: 100,
        };
    },
    components: {
        'v-axes-helper': axesHelperComponent,
        'v-cube': cubeComponent,
        'v-light': lightComponent,
        'v-scene': sceneComponent,
    },
};
</script>
