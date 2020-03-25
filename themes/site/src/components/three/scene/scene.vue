<template>
    <div class="border-4 border-gray-300 border-dashed"><slot /></div>
</template>

<script>
import { Scene, PerspectiveCamera } from 'three';
import { useDisposable, useThree } from '@/app/behaviors/three/base';
import { degreesToRadians } from '@/app/utils/number';

export default {
    /**
     * Before destroy.
     *
     * @return {void}
     */
    beforeDestroy() {
        this.$root.$emit('scene-remove', this.scene);
    },

    /**
     * Mounted.
     *
     * @return {void}
     */
    mounted() {
        this.scene.userData.el = this.$el;

        this.syncCameraPosition();

        this.$root.$emit('scene-add', this.scene);
    },

    /**
     * Setup.
     *
     * @return {void}
     */
    setup(props, context) {
        const scene = new Scene();

        scene.userData.camera = new PerspectiveCamera(
            props.cameraFov,
            props.cameraAspect,
            props.cameraNear,
            props.cameraFar,
        );

        const { getThreeObj } = useThree(scene, { context });

        useDisposable(scene);

        return {
            getThreeObj,
        };
    },
    computed: {
        /**
         * Camera position.
         *
         * @return {object}
         */
        cameraPosition() {
            const angle = degreesToRadians(this.cameraAngle);

            return {
                adjacent: Math.sin(angle) * this.cameraDistance,
                opposite: Math.cos(angle) * this.cameraDistance,
            };
        },

        /**
         * Scene.
         *
         * @return {Scene}
         */
        scene() {
            return this.getThreeObj();
        },
    },
    methods: {
        syncCameraPosition() {
            const { camera } = this.scene.userData;
            const { opposite, adjacent } = this.cameraPosition;

            camera.position.set(0, opposite, adjacent);
            camera.lookAt(0, 0, 0);
        },
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
    watch: {
        cameraPosition: 'syncCameraPosition',
    },
};
</script>
