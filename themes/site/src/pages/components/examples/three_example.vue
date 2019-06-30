<template>
    <v-example title="three">
        <p>
            These are our lower level 3D rendering components.
        </p>

        <div class="border-4 border-primary-5 max-w-sm mx-auto">
            <v-scene>
                <!-- lights -->
                <v-light type="ambient" :color="0xffffff" :intensity="lightIntensity / 100" />
                <v-light type="point" :color="0xffffff" :intensity="lightIntensity / 100" />

                <!-- camera -->
                <v-camera :angle="cameraAngle" :distance="cameraDistance" />

                <!-- action -->
                <v-box
                    :color="0x00ff00"
                    :position="{ x: 0, y: 0, z: 0 }"
                    :size="1"
                />


            </v-scene>

            <v-range-input v-model="cameraAngle" :min="0" :max="90" />
            <v-range-input v-model="cameraDistance" :min="0" :max="100" />
            <v-range-input v-model="lightIntensity" :min="0" :max="100" />

            <pre>{{ $data }}</pre>
        </div>
    </v-example>
</template>

<script>
import boxComponent from '@/components/three/box/box.vue';
import cameraComponent from '@/components/three/camera/camera.vue';
import exampleComponent from '../example.vue';
import lightComponent from '@/components/three/light/light.vue';
import sceneComponent from '@/components/three/scene/scene.vue';
import shapeComponent from '@/components/three/shape/shape.vue';

import { roundedRectangle } from '@/components/three/geometries';

export default {
    components: {
        'v-box': boxComponent,
        'v-camera': cameraComponent,
        'v-example': exampleComponent,
        'v-light': lightComponent,
        'v-scene': sceneComponent,
        'v-shape': shapeComponent,
    },
    data() {
        return {
            cameraAngle: 45,
            cameraDistance: 5,
            lightIntensity: 50,
        };
    },
    computed: {
        roundedRectangle() {
            return roundedRectangle(10, 10, 3);
        },
    },
};
</script>
