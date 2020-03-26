<template>
    <div class="hidden">
        
    </div>
</template>

<script>
import { isPlainObject } from 'lodash-es';
import { BoxGeometry, MeshLambertMaterial, Mesh, Object3D } from 'three';
import { computed, watch } from '@vue/composition-api';
import { threeProps, useDisposable, useThree } from '@/app/behaviors/three/base';
import objectComponent from '../../object/object.vue';

function normalizeDimensions(val) {
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
        const obj = new Object3D();
        const { getThreeObj } = useThree(new Object3D(), {
            context,
            name: () => props.name,
            position: () => props.position,
            rotation: () => props.rotation,
            scale: () => props.scale,
        });

        return { getThreeObj };
    },
    components: {
        'v-object': objectComponent,
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
