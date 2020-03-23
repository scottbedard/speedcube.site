<template>
    <v-page padded>
        <v-margin padded>
            <h1 class="mb-12">3D Sandbox</h1>

            <div style="padding-bottom: 2000px">
                <v-scene>
                    Hmm...
                </v-scene>
            </div>
        </v-margin>
    </v-page>
</template>

<script>
import sceneComponent from '@/components/three/scene/scene.vue';

export default {
    data() {
        return {
            // ...
        };
    },
    components: {
        'v-scene': sceneComponent,
    },
};
</script>
