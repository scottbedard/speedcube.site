<template>
    <div class="border-4 border-primary-5" ref="container">
        <slot />
    </div>
</template>

<script>
import { onMounted, ref } from '@vue/composition-api';
import { PerspectiveCamera, Scene } from 'three';
import { useScene } from 'vue-use-three';

export default {
    setup(props) {
        const container = ref();

        const camera = new PerspectiveCamera(
            props.cameraFov,
            props.cameraAspect,
            props.cameraNear,
            props.cameraFar,
        );

        const scene = new Scene();
        scene.userData.camera = camera;

        useScene(scene);

        onMounted(() => {
            scene.userData.container = container.value;
        });

        return {
            container,
        };
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
