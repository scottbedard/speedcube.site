<template>
    <div class="border-4 border-primary-5" ref="container">
        <slot />
    </div>
</template>

<script>
import { onMounted, ref, watch } from '@vue/composition-api';
import { BoxGeometry, Mesh, MeshNormalMaterial, PerspectiveCamera, Scene } from 'three';
import { useNesting, usePosition, useScene } from 'vue-use-three';
import { degreesToRadians, greaterThanZero } from '@/app/utils/number';

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

        // const geometry = new BoxGeometry(10, 10, 10);
        // const material = new MeshNormalMaterial();
        // const mesh = new Mesh(geometry, material);
        // scene.add(mesh);

        useScene(scene);

        useNesting(scene);

        usePosition(camera, () => {
            const angle = degreesToRadians(props.cameraAngle);
            const distance = greaterThanZero(props.cameraDistance);

            return {
                y: Math.cos(angle) * distance,
                z: Math.sin(angle) * distance,
            };
        });

        watch(() => [props.cameraAngle, props.cameraDistance], () => camera.lookAt(0, 0, 0));

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
            default: 1,
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
