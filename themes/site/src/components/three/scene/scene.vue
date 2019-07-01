<style lang="scss" scoped>
    div {
        padding-top: 100%;
    }
</style>

<template>
    <div><slot /></div>
</template>

<script>
import { Scene } from 'three';

export default {
    created() {
        const scene = new Scene();

        this.$options.three = {
            camera: null,
            scene,
        };
    },
    mounted() {
        this.$root.$emit('scene-add', this);
    },
    destroyed() {
        this.$root.$emit('scene-remove', this);
    },
    methods: {
        registerCamera(camera) {
            this.$options.three.camera = camera;
        },
        unregisterCamera() {
            this.$options.three.camera = null;
        },
    },
    name: 'scene',
    props: {
        // ...
    },
};
</script>
