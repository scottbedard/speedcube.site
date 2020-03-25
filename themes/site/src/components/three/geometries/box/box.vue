<template>
    <div class="hidden">
        <v-object
            :position="{ y: dimensions.y / 2 }"
            :rotation="{ x: -90 }">
            <slot name="U" />
        </v-object>
        <v-object
            :position="{ x: dimensions.x / -2 }"
            :rotation="{ y: -90 }">
            <slot name="L" />
        </v-object>
        <v-object
            :position="{ z: dimensions.z / 2 }"
            :rotation="{ }">
            <slot name="F" />
        </v-object>
        <v-object
            :position="{ x: dimensions.x / 2 }"
            :rotation="{ y: 90 }">
            <slot name="R" />
        </v-object>
        <v-object
            :position="{ z: dimensions.z / -2 }"
            :rotation="{ y: 180 }">
            <slot name="B" />
        </v-object>
        <v-object
            :position="{ y: dimensions.y / -2 }"
            :rotation="{ x: 90 }">
            <slot name="D" />
        </v-object>
    </div>
</template>

<script>
import { isPlainObject } from 'lodash-es';
import { BoxGeometry, MeshLambertMaterial, Mesh } from 'three';
import { computed, watch } from '@vue/composition-api';
import { threeProps, useDisposable, useThree } from '@/app/behaviors/three';
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
        const dimensions = computed(() => normalizeDimensions(props.size));

        let { x, y, z } = dimensions.value;

        const geometry = new BoxGeometry(x, y, z);
        const material = new MeshLambertMaterial({ wireframe: true });
        const mesh = new Mesh(geometry, material);

        watch(dimensions, ({ x: newX, y: newY, z: newZ }) => {
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
            name: () => props.name,
            position: () => props.position,
            rotation: () => props.rotation,
            scale: () => props.scale,
        });

        useDisposable(geometry, material);

        return {
            dimensions,
            getThreeObj,
        };
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
