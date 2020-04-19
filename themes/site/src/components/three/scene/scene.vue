<template>
    <div>
        <slot />
    </div>
</template>

<script>
import { PerspectiveCamera, Scene } from 'three';
import { useScene } from 'vue-use-three';

export default {
    setup(props) {
        const camera = new PerspectiveCamera(
            props.cameraFov,
            props.cameraAspect,
            props.cameraNear,
            props.cameraFar,
        );

        const scene = new Scene();

        useScene(scene, { camera });
    },
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
            default: 1000,
            type: Number,
        },
        cameraFov: {
            default: 60,
            type: Number,
        },
        cameraNear: {
            default: 0.01,
            type: Number,
        },
    },
};
</script>
