<template>
    <div>
        <slot />
    </div>
</template>

<script>
import {
    CubeGeometry,
    MeshLambertMaterial,
    Mesh,
} from 'three';

import { threeProps, useThree } from '@/app/behaviors/three';

export default {
    /**
     * Setup.
     *
     * @return {void}
     */
    setup(props, context) {
        const { position, rotation, scale } = props;

        const geometry = new CubeGeometry(20, 20, 20);

        const material = new MeshLambertMaterial({
            wireframe: true,
        });

        const mesh = new Mesh(geometry, material);

        const { getThreeObj } = useThree(mesh, {
            context,
            position,
            rotation,
            scale,
        });

        return { getThreeObj };
    },
    props: {
        ...threeProps,
    },
};
</script>
