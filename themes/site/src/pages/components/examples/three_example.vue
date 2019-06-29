<template>
    <v-example title="three">
        <p>
            These are our lower level 3D rendering components.
        </p>

        <v-scene>
            <v-camera
                :angle="45"
                :distance="500"
            />
        </v-scene>
    </v-example>
</template>

<script>
import cameraComponent from '@/components/three/camera/camera.vue';
import exampleComponent from '../example.vue';
import sceneComponent from '@/components/three/scene/scene.vue';

export default {
    components: {
        'v-camera': cameraComponent,
        'v-example': exampleComponent,
        'v-scene': sceneComponent,
    },
};
</script>
