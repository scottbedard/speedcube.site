<template>
    <div class="absolute h-full w-full"><slot /></div>
</template>

<script>
import base from '../base';
import { Scene, PerspectiveCamera } from 'three';
import { degreesToRadians } from '@/app/utils/number';

export default {
    created() {
        this.$options.three.obj = new Scene();
        this.$options.three.camera = new PerspectiveCamera(this.cameraFov, this.cameraAspect, this.cameraNear, this.cameraFar);

        this.syncCameraPosition();
    },
    mounted() {
        this.$root.$emit('scene-add', this);
    },
    destroyed() {
        this.$root.$emit('scene-remove', this);

        this.disposeScene();
    },
    computed: {
        cameraPosition() {
            const angle = degreesToRadians(this.cameraAngle);
            const adjacent = Math.sin(angle) * this.cameraDistance;
            const opposite = Math.cos(angle) * this.cameraDistance;

            return { opposite, adjacent };
        },
    },
    methods: {
        disposeScene() {
            const { obj: scene } = this.$options.three;

            scene.dispose();
        },
        syncCameraPosition() {
            const { camera } = this.$options.three;
            const { opposite, adjacent } = this.cameraPosition;

            camera.position.set(0, opposite, adjacent);
            camera.lookAt(0, 0, 0);
        },
    },
    mixins: [
        base,
    ],
    name: 'scene',
    props: {
        cameraAngle: {
            default: 0,
            type: Number,
        },
        cameraAspect: {
            default: 1,
            type: Number,
        },
        cameraDistance: {
            default: 0,
            type: Number,
        },
        cameraFar: {
            default: 10000,
            type: Number,
        },
        cameraFov: {
            default: 60,
            type: Number,
        },
        cameraNear: {
            default: 1,
            type: Number,
        },
    },
    watch: {
        cameraPosition: 'syncCameraPosition',
    },
};
</script>
