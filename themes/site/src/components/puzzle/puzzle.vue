<template>
    <v-group
        :position="position"
        :rotation="rotation">
        <!-- <v-ambient-light
            :intensity="0.7"
            :position="{ y: 1000 }"
        />

        <v-point-light
            :intensity="0.8"
            :position="{ z: 1000 }"
        /> -->

        <component
            :is="puzzle"
            :model="model"
        />
    </v-group>
</template>

<script>
import { stubObject } from 'lodash-es';
import groupComponent from '@/components/three/group/group.vue';

export default {
    components: {
        'v-group': groupComponent,
    },
    computed: {
        puzzle() {
            if (this.type === 'cube') {
                return () => import('./cube/cube.vue');
            }

            throw new Error(`Unknown puzzle type "${this.type}"`);
        },
    },
    props: {
        model: {
            required: true,
            type: Object,
        },
        position: {
            default: stubObject,
            type: Object,
        },
        rotation: {
            default: stubObject,
            type: Object,
        },
        type: {
            required: true,
            type: String,
        },
    },
};
</script>
