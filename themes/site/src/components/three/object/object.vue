<template>
    <div class="hidden"><slot /></div>
</template>

<script>
import { Object3D } from 'three';
import { threeProps, useThree } from '@/app/behaviors/three';

export default {
    /**
     * Setup.
     *
     * @return {void}
     */
    setup(props, context) {
        const obj = new Object3D();

        const { getThreeObj, setLocalPosition } = useThree(obj, {
            context,
            name: () => props.name,
            position: () => props.position,
            rotation: () => props.rotation,
            scale: () => props.scale,
        });

        return { getThreeObj, setLocalPosition };
    },
    props: {
        ...threeProps,
    },
};
</script>
