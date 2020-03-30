<template>
    <div class="hidden">
        <v-object
            v-for="face in faces"
            :key="face.name"
            :look-at="face.lookAt"
            :position="face.vector">
            <slot :name="face.name" />
        </v-object>
    </div>
</template>

<script>
import { IcosahedronGeometry, Object3D, Quaternion } from 'three';
import { ref, watch } from '@vue/composition-api';
import { threeProps, useDisposable, useThree } from '@/app/behaviors/three';
import { midpoint } from '@/app/utils/geometry';
import objectComponent from '../../object/object.vue';
import sphereComponent from '../sphere/sphere.vue';

/**
 * This array maps faces to their cooresponding vertice index.
 *
 * @const {string[]}
 */
const faceMap = [
    'l', // 0
    'u', // 1
    'bl', // 2
    'br', // 3
    'b', // 4
    'dbl', // 5
    'r', // 6
    'f', // 7
    'dl', // 8
    'd', // 9
    'dbr', // 10
    'dr', // 11
];

export default {
    /**
     * Setup.
     *
     * @return {void}
     */
    setup(props, context) {
        // rather than use a dodecahedron geometry and making a bunch
        // of measurements, we'll use an icosahedron and scale it so
        // the vertices can be used as our dodecahedron face vectors.
        const geometry = new IcosahedronGeometry(props.size * 1.309);

        ref(geometry.vertices);

        useDisposable(geometry);

        // rotate the geometry so U and F faces point towards camera
        const quaternion = new Quaternion();

        quaternion.setFromUnitVectors(
            midpoint(geometry.vertices[2], geometry.vertices[3]).normalize(),
            geometry.vertices[4].clone().normalize(),
        );

        geometry.vertices.forEach(vector => vector.applyQuaternion(quaternion));

        // resize geometry when size prop changes
        watch(() => props.size, (size, oldSize) => {
            if (oldSize) {
                const scale = 1 - ((oldSize - size) / oldSize);
                geometry.scale(scale, scale, scale);
            }
        });

        // create three context for child components
        const obj = new Object3D();

        const { getThreeObj } = useThree(obj, {
            context,
            name: () => props.name,
            position: () => props.position,
            rotation: () => props.rotation,
            scale: () => props.scale,
        });

        // create an array of face data so we can expose slots for them
        const faces = faceMap.map((name, index) => {
            const vector = geometry.vertices[index];

            return {
                lookAt: midpoint(obj.position, vector, 2),
                name,
                vector,
            };
        });

        return { faces, getThreeObj };
    },
    components: {
        'v-object': objectComponent,
        'v-sphere': sphereComponent,
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
