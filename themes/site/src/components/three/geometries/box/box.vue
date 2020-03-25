<template>
    <div>
        <slot />
    </div>
</template>

<script>
import { isPlainObject } from 'lodash-es';
import { BoxGeometry, MeshLambertMaterial, Mesh } from 'three';
import { watch } from '@vue/composition-api';
import { threeProps, useThree } from '@/app/behaviors/three';

function dimensions(val) {
    const { x, y, z } = isPlainObject(val)
        ? { x: 1, y: 1, z: 1, ...val }
        : { x: val, y: val, z: val };

    return {
        x: Math.max(Number.EPSILON, x),
        y: Math.max(Number.EPSILON, y),
        z: Math.max(Number.EPSILON, z),
    };
}

export default {
    /**
     * Setup.
     *
     * @return {void}
     */
    setup(props, context) {
        let { x, y, z } = dimensions(props.size);
        const geometry = new BoxGeometry(x, y, z);
        const material = new MeshLambertMaterial({ wireframe: true });
        const mesh = new Mesh(geometry, material);

        watch(() => props.size, (size) => {
            const { x: newX, y: newY, z: newZ } = dimensions(size);
            const xDiff = newX / x;
            const yDiff = newY / y;
            const zDiff = newZ / z;

            if (xDiff !== 1 || yDiff !== 1 || zDiff !== 1) {
                geometry.scale(xDiff, yDiff, zDiff);
                x = newX;
                y = newY;
                z = newZ;
            }
        }, { deep: true });

        const { getThreeObj } = useThree(mesh, {
            context,
            position: props.position,
            rotation: props.rotation,
            scale: props.scale,
        });

        return { getThreeObj };
    },
    props: {
        ...threeProps,
        size: {
            default: 10,
            type: [Number, Object],
        },
    },
};
</script>
