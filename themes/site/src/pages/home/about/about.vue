<template>
    <div class="flex flex-wrap md:flex-no-wrap">
        <div class="w-full md:flex-1 md:w-auto">
            Copy will go here
        </div>

        <div class="relative max-w-xl mx-auto w-full md:w-half">
            <div class="pb-full absoloute border right-0 top-0">
                <v-scene
                    :camera-angle="90"
                    :camera-distance="1000">

                    <v-axes-helper :size="200" />

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

                    <v-obj :position="{ x: 0, z: 600 }">
                        <v-cube type="2x2" />
                    </v-obj>
                    <v-obj :position="{ y: 400 }">
                        <v-cube type="3x3" />
                    </v-obj>
                    <v-obj :position="{ x: 400 }">
                        <v-cube type="4x4" />
                    </v-obj>
                    <v-obj :position="{ y: -400 }">
                        <v-cube type="5x5" />
                    </v-obj>
                </v-scene>
            </div>
        </div>
    </div>
</template>

<script>
import axesHelperComponent from '@/components/three/axes_helper/axes_helper.vue';
import boxComponent from '@/components/three/box/box.vue';
import objComponent from '@/components/three/obj/obj.vue';
import lightComponent from '@/components/three/light/light.vue';
import sceneComponent from '@/components/three/scene/scene.vue';
import cubeComponent from '@/components/puzzle/cube/cube.vue';

export default {
    components: {
        'v-axes-helper': axesHelperComponent,
        'v-light': lightComponent,
        'v-scene': sceneComponent,
        'v-box': boxComponent,
        'v-obj': objComponent,
        'v-cube': cubeComponent,
    },
    methods: {
        // ...
    },
};
</script>
