<template>
    <div class="hidden">
        <slot />
    </div>
</template>

<script>
import { Object3D } from 'three';
import { useThree } from '@/app/behaviors/three';

export default {
    /**
     * Mounted.
     *
     * @return {void}
     */
    mounted() {
        this.resize();
    },

    /**
     * Setup.
     *
     * @return {void}
     */
    setup(props, context) {
        const obj = new Object3D();

        const { getThreeObj } = useThree(obj, { context });

        return { getThreeObj };
    },
    methods: {
        /**
         * Resize face and reposition children.
         *
         * @return {void}
         */
        resize() {
            const obj = this.getThreeObj();
            const scale = Math.max(Number.EPSILON, this.scale);

            obj.scale.x = scale;
            obj.scale.y = scale;

            obj.children.forEach((child) => {
                child.scale.x = 1 / scale;
                child.scale.y = 1 / scale;
            });
        },
    },
    props: {
        scale: {
            default: 1,
            type: Number,
        },
    },
    watch: {
        scale: 'resize',
    },
};
</script>
