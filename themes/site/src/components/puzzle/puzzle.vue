<template>
    <v-group>
        <v-sphere color="#f00" />
    </v-group>
</template>

<script>
import groupComponent from '@/components/three/group/group.vue';
import sphereComponent from '@/components/three/geometries/sphere/sphere.vue';

export default {
    components: {
        'v-group': groupComponent,
        'v-sphere': sphereComponent,
    },
    props: {
        model: {
            required: true,
            type: Object,
        },
        type: {
            required: true,
            type: String,
        },
    },
};
</script>
