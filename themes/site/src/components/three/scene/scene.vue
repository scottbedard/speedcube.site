<template>
    <div class="border-4 border-gray-300 border-dashed"><slot /></div>
</template>

<script>
import { Scene, PerspectiveCamera } from 'three';
import { useThree } from '@/app/behaviors/three';
import { degreesToRadians } from '@/app/utils/number';

export default {
    /**
     * Before destroy.
     *
     * @return {void}
     */
    beforeDestroy() {
        this.$root.$emit('scene-remove', this.threeObj);
    },

    /**
     * Mounted.
     *
     * @return {void}
     */
    mounted() {
        this.syncCameraPosition();

        this.threeObj.userData.el = this.$el;

        this.$root.$emit('scene-add', this.threeObj);
    },

    /**
     * Setup.
     *
     * @return {void}
     */
    setup(props, context) {
        const camera = new PerspectiveCamera(
            props.cameraFov,
            props.cameraAspect,
            props.cameraNear,
            props.cameraFar,
        );

        const scene = new Scene();

        scene.userData.camera = camera;

        const { threeObj } = useThree(scene, { context });

        return { threeObj };
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
    },
    methods: {
        syncCameraPosition() {
            const { camera } = this.threeObj.userData;
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
