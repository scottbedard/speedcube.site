<template>
    <v-group :position="position" :rotation="rotation">
        <v-ambient-light :intensity="0.7" :position="{ y: 200 }" />
        <v-point-light :intensity="0.8" :position="{ z: 500 }" />

        <component
            :config="config"
            :is="puzzle"
            :model="model"
        />
    </v-group>
</template>

<script>
import { stubObject } from 'lodash-es';
import ambientLightComponent from '@/components/three/ambient_light/ambient_light.vue';
import groupComponent from '@/components/three/group/group.vue';
import pointLightComponent from '@/components/three/point_light/point_light.vue';

export default {
    components: {
        'v-ambient-light': ambientLightComponent,
        'v-point-light': pointLightComponent,
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
        config: {
            default: stubObject,
            type: Object,
        },
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
