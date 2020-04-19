<template>
    <v-page padded>
        <v-margin padded>
            <v-scene>

            </v-scene>
        </v-margin>
    </v-page>
</template>

<script>
import sceneComponent from '@/components/three/scene/scene.vue';

export default {
    components: {
        'v-scene': sceneComponent,
    },
};
</script>
