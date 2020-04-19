<template>
    <v-page padded>
        <v-margin padded>
            <button @click="visible = !visible">toggle: {{ visible }}</button>
            <v-scene v-if="visible" class="max-w-md mx-auto">
                <div class="pb-full" />
            </v-scene>

            <div style="border: 4px dashed green; height: 2000px; margin: 4rem" />
        </v-margin>
    </v-page>
</template>

<script>
import sceneComponent from '@/components/three/scene/scene.vue';

export default {
    data() {
        return { visible: true };
    },
    components: {
        'v-scene': sceneComponent,
    },
};
</script>
