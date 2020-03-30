<template>
    <v-scene
        class="border-4 border-dashed pb-full"
        :camera-angle="cameraAngle"
        :camera-distance="cameraDistance">

        <!-- axes helper -->
        <v-axes-helper v-if="debug" :size="100" />

        <!-- lighting -->
        <v-ambient-light
            :intensity="0.7"
            :position="{ y: 1000 }"
        />

        <v-point-light
            :intensity="0.8"
            :position="{ z: 1000 }"
        />

        <!-- puzzle -->
        <component
            :config="config"
            :is="typeComponent"
            :rotation="rotation"
            :size="size"
            :turn-progress="turnProgress"
            :turn="turn"
            :type="type"
        />
    </v-scene>
</template>

<script>
import { stubObject } from 'lodash-es';
import ambientLightComponent from '@/components/three/ambient_light/ambient_light.vue';
import axesHelperComponent from '@/components/three/axes_helper/axes_helper.vue';
import pointLightComponent from '@/components/three/point_light/point_light.vue';
import sceneComponent from '../three/scene/scene.vue';

export default {
    components: {
        'v-ambient-light': ambientLightComponent,
        'v-axes-helper': axesHelperComponent,
        'v-point-light': pointLightComponent,
        'v-scene': sceneComponent,
    },
    computed: {
        typeComponent() {
            const component = {
                megaminx: () => import('./dodecaminx/dodecaminx.vue'),
            }[this.type];

            if (!component) {
                console.error(`Invalid puzzle type: ${this.type}`);
            }

            return component;
        },
    },
    props: {
        debug: {
            default: false,
            type: Boolean,
        },
        cameraAngle: {
            default: 60,
            type: Number,
        },
        cameraDistance: {
            default: 150,
            type: Number,
        },
        config: {
            default: stubObject,
            type: Object,
        },
        rotation: {
            type: Object,
        },
        size: {
            default: 100,
            type: Number,
        },
        turnProgress: {
            default: 0,
            type: Number,
        },
        turn: {
            type: String,
        },
        type: {
            required: true,
            type: String,
        },
    },
};
</script>
