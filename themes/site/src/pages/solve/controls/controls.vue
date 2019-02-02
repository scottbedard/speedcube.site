<template>
    <div>
        <!-- cube controls -->
        <v-cube-controls
            v-if="isCube"
        />
    </div>
</template>

<script>
import { isCube } from '@/app/utils/puzzle';
import cubeControlsComponent from './cube_controls/cube_controls.vue';

export default {
    components: {
        'v-cube-controls': cubeControlsComponent,
    },
    computed: {
        isCube() {
            return isCube(this.puzzle);
        },
    },
    props: {
        puzzle: {
            required: true,
            type: String,
        },
    },
};
</script>
