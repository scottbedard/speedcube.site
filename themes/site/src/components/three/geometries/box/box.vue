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

import { useThree } from '@/app/behaviors/three';

export default {
    /**
     * Setup.
     *
     * @return {void}
     */
    setup(props, context) {
        const geometry = new CubeGeometry(5, 5, 5);

        const material = new MeshLambertMaterial({
            color: 0xff0000,
        });

        const mesh = new Mesh(geometry, material);

        const { threeObj } = useThree(mesh, { context });

        return { threeObj };
    },
};
</script>
