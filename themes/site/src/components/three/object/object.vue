<template>
    <div class="hidden"><slot /></div>
</template>

<script>
import { Object3D } from 'three';
import { useThree } from '@/app/behaviors/three';

export default {
    /**
     * Setup.
     *
     * @return {void}
     */
    setup(props, context) {
        const obj = new Object3D();

        return useThree(obj, { context, props });
    },
};
</script>
