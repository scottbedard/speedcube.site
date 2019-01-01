<template>
    <div>
        <v-cube
            v-if="isCube"
            :puzzle="puzzle"
            :width="width"
        />
    </div>
</template>

<script>
import cubeComponent from './cube/cube.vue';

export default {
    data() {
        return {
            // tracks the dimensions of our containing element
            width: 0,
        }
    },
    mounted() {
        this.trackParentDimensions();
    },
    components: {
        'v-cube': cubeComponent,
    },
    computed: {
        isCube() {
            return ['2x2', '3x3', '4x4', '5x5'].includes(this.puzzle);
        },
    },
    methods: {
        trackParentDimensions() {
            const sync = () => {
                this.width = this.$el.offsetWidth;
            }

            sync();

            window.addEventListener('resize', sync);

            this.$on('hook:destroyed', () => {
                window.removeEventListener('resize', sync);
            });
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
