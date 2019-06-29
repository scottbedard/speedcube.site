<template>
    <v-example title="three">
        <p>
            These are our lower level 3D rendering components.
        </p>

        <div class="border-4 border-primary-5 max-w-sm mx-auto">
            <v-scene>
                <!-- lights -->
                <v-ambient-light
                    :color="0xffffff"
                    :intensity="0.7"
                />

                <!-- camera -->
                <v-camera
                    :angle="45"
                    :distance="10"
                />

                <!-- action -->
                <v-box
                    :color="0x00ff00"
                    :position="{ x: 0, y: 0, z: 0 }"
                    :size="1"
                />
            </v-scene>
        </div>
    </v-example>
</template>

<script>
import ambientLightComponent from '@/components/three/ambient_light/ambient_light.vue';
import boxComponent from '@/components/three/box/box.vue';
import cameraComponent from '@/components/three/camera/camera.vue';
import exampleComponent from '../example.vue';
import sceneComponent from '@/components/three/scene/scene.vue';

export default {
    components: {
        'v-ambient-light': ambientLightComponent,
        'v-box': boxComponent,
        'v-camera': cameraComponent,
        'v-example': exampleComponent,
        'v-scene': sceneComponent,
    },
};
</script>
