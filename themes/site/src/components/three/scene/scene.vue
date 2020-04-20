<template>
    <div class="border-4 border-primary-5" ref="container">
        <slot />
    </div>
</template>

<script>
import { onMounted, ref } from '@vue/composition-api';
import { BoxGeometry, Mesh, MeshNormalMaterial, PerspectiveCamera, Scene } from 'three';
import { useNesting, useScene } from 'vue-use-three';

export default {
    setup(props) {
        const container = ref();

        const camera = new PerspectiveCamera(
            props.cameraFov,
            props.cameraAspect,
            props.cameraNear,
            props.cameraFar,
        );

        camera.position.z = 1;

        const scene = new Scene();
        scene.userData.camera = camera;

        const geometry = new BoxGeometry(0.2, 0.2, 0.2);
        const material = new MeshNormalMaterial();
        const mesh = new Mesh(geometry, material);
        scene.add(mesh);

        useScene(scene);

        useNesting(scene);

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
