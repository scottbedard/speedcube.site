<template>
    <v-page padded>
        <v-margin padded>
            <h1>3D Sandbox</h1>

            <div class="mb-6">
                <button @click="scene = !scene">toggle</button>
            </div>

            <div style="padding: 100px 0">
                <v-scene v-if="scene">
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
            scene: false,
        };
    },
    components: {
        'v-scene': sceneComponent,
    },
};
</script>
