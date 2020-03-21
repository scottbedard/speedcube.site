<template>
    <div class="border-4 border-gray-300 border-dashed"><slot /></div>
</template>

<script>
import { Scene, PerspectiveCamera } from 'three';
import { useThree } from '@/app/behaviors/three';

export default {
    /**
     * Created.
     *
     * @return {void}
     */
    created() {
        const camera = new PerspectiveCamera(
            this.cameraFov,
            this.cameraAspect,
            this.cameraNear,
            this.cameraFar,
        );

        const scene = new Scene();

        this.setThreeObj(scene);

        this.$on('hook:mounted', () => {
            this.$root.$emit('scene-add', scene);
        });

        this.$on('hook:beforeDestroy', () => {
            this.$root.$emit('scene-remove', scene);
        });
    },

    /**
     * Setup.
     *
     * @return {void}
     */
    setup() {
        const { setThreeObj } = useThree();

        return { setThreeObj };
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
};
</script>
