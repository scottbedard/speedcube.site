<template>
    <div class="hidden">
        <v-object :position="{ y: y / 2 }" :rotation="{ x: -90 }">
            <slot name="u" />
        </v-object>
        <v-object :position="{ x: x / -2 }" :rotation="{ y: -90 }">
            <slot name="l" />
        </v-object>
        <v-object :position="{ z: z / 2 }">
            <slot name="f" />
        </v-object>
        <v-object :position="{ x: x / 2 }" :rotation="{ y: 90 }">
            <slot name="r" />
        </v-object>
        <v-object :position="{ z: z / -2 }" :rotation="{ y: 180 }">
            <slot name="b" />
        </v-object>
        <v-object :position="{ y: y / -2 }" :rotation="{ x: 90 }">
            <slot name="d" />
        </v-object>
    </div>
</template>

<script>
import { isPlainObject } from 'lodash-es';
import { Object3D } from 'three';
import { threeProps, useThree } from '@/app/behaviors/three/base';
import objectComponent from '../../object/object.vue';

export default {
    /**
     * Setup.
     *
     * @return {void}
     */
    setup(props, context) {
        const obj = new Object3D();

        const { getThreeObj } = useThree(obj, {
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
    computed: {
        x() {
            return isPlainObject(this.size) ? this.size.x : this.size;
        },
        y() {
            return isPlainObject(this.size) ? this.size.y : this.size;
        },
        z() {
            return isPlainObject(this.size) ? this.size.z : this.size;
        },
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
