<template>
    <v-example title="three">
        <p>
            These are some of our lower level 3D rendering components.
        </p>

        <div class="max-w-xs mx-auto my-8">
            <v-scene>
                <v-axes-helper />

                <!-- lights -->
                <v-light
                    type="ambient"
                    :color="0xffff00"
                    :intensity="0.8"
                />

                <!-- action -->
                <v-box
                    :color="0x00ff00"
                    :position="{ x: 0, y: 0, z: 0 }"
                    :size="25"
                />
            </v-scene>
        </div>

        <div class="max-w-sm mx-auto">
            <div>
                <label class="mb-1 text-grey-7 tracking-wide text-xs uppercase">Camera Angle</label>
                <v-range-input v-model="cameraAngle" :min="0" :max="90" />
            </div>
        </div>
    </v-example>
</template>

<script>
import axesHelperComponent from '@/components/three/axes_helper/axes_helper.vue';
import boxComponent from '@/components/three/box/box.vue';
import exampleComponent from '../example.vue';
import lightComponent from '@/components/three/light/light.vue';
import sceneComponent from '@/components/three/scene/scene.vue';
import shapeComponent from '@/components/three/shape/shape.vue';

import { roundedRectangle } from '@/components/three/geometries';

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
        };
    },
    computed: {
        roundedRectangle() {
            return roundedRectangle(this.size, this.size, this.radius);
        },
    },
};
</script>
