<template>
    <div class="hidden">
        <v-object
            v-for="face in faces"
            :key="face"
            :look-at="{ x: 0, y: 0, z: 0 }"
            :rotation="{ z: 40 }"
            :position="center(face)">
            <slot :name="face" />
        </v-object>
    </div>
</template>

<script>
import { DodecahedronGeometry, Object3D } from 'three';
import { computed, ref, watch } from '@vue/composition-api';
import { threeProps, useDisposable, useThree } from '@/app/behaviors/three';
import { hasSameMembers } from '@/app/utils/array';
import { degreesToRadians } from '@/app/utils/number';
import { midpoint, midpointDistance } from '@/app/utils/geometry';
import objectComponent from '../../object/object.vue';

/**
 * Map of corners to opposite edges that can be used
 * to calculate the center of a face.
 *
 * @const {Object}
 */
const centerMap = {
    u: [['u', 'f'], ['u', 'bl', 'br']],
    f: [['u', 'f'], ['f', 'dl', 'dr']],
    r: [['u', 'r'], ['r', 'dr', 'dbr']],
    l: [['u', 'l'], ['l', 'dl', 'dbl']],
    bl: [['u', 'bl'], ['bl', 'b', 'dbl']],
    br: [['u', 'br'], ['br', 'b', 'dbr']],
    dl: [['dl', 'l'], ['dl', 'dr', 'd']],
    dr: [['dr', 'r'], ['dr', 'dl', 'd']],
    dbl: [['dbl', 'l'], ['dbl', 'b', 'd']],
    dbr: [['dbr', 'r'], ['dbr', 'b', 'd']],
    b: [['b', 'd'], ['b', 'bl', 'br']],
    d: [['d', 'b'], ['d', 'dl', 'dr']],
};

/**
 * Map tri-face intersections to vertice indexes.
 *
 * @const {string[][]}
 */
const cornerMap = [
    ['f', 'dr', 'dl'], // 0
    ['f', 'r', 'dr'], // 1
    ['f', 'l', 'dl'], // 2
    ['u', 'r', 'f'], // 3
    ['u', 'f', 'l'], // 4
    ['r', 'dr', 'dbr'], // 5
    ['r', 'br', 'dbr'], // 6
    ['u', 'br', 'r'], // 7
    ['br', 'dbr', 'b'], // 8
    ['br', 'bl', 'b'], // 9
    ['u', 'bl', 'br'], // 10
    ['bl', 'dbl', 'b'], // 11
    ['l', 'bl', 'dbl'], // 12
    ['u', 'bl', 'l'], // 13
    ['d', 'b', 'dbl'], // 14
    ['dl', 'dbl', 'd'], // 15
    ['l', 'dl', 'dbl'], // 16
    ['dl', 'dr', 'd'], // 17
    ['b', 'd', 'dbr'], // 18
    ['dr', 'dbr', 'd'], // 19
];


/**
 * Faces.
 *
 * @const {string[]}
 */
const faces = [
    'u',
    'bl',
    'br',
    'l',
    'r',
    'f',
    'dl',
    'dr',
    'dbl',
    'dbr',
    'b',
    'd',
];

/**
 * Map face pairs to vertice indexes.
 *
 * @const {Array<Array>}
 */
const midpointMap = [
    [['u', 'f'], [4, 3]],
    [['u', 'r'], [3, 7]],
    [['u', 'br'], [7, 10]],
    [['u', 'bl'], [10, 13]],
    [['u', 'l'], [13, 4]],
    [['f', 'l'], [4, 2]],
    [['f', 'r'], [3, 1]],
    [['r', 'br'], [7, 6]],
    [['br', 'bl'], [10, 9]],
    [['bl', 'l'], [13, 12]],
    [['f', 'dl'], [2, 0]],
    [['f', 'dr'], [0, 1]],
    [['r', 'dr'], [1, 5]],
    [['r', 'dbr'], [5, 6]],
    [['br', 'dbr'], [6, 8]],
    [['br', 'b'], [8, 9]],
    [['bl', 'b'], [9, 11]],
    [['bl', 'dbl'], [11, 12]],
    [['l', 'dbl'], [12, 16]],
    [['l', 'dl'], [16, 2]],
    [['dl', 'dr'], [0, 17]],
    [['dr', 'dbr'], [19, 5]],
    [['dbr', 'b'], [18, 8]],
    [['b', 'dbl'], [11, 14]],
    [['dl', 'dbl'], [16, 15]],
    [['d', 'dr'], [17, 19]],
    [['d', 'dbr'], [19, 18]],
    [['d', 'b'], [18, 14]],
    [['d', 'dbl'], [14, 15]],
    [['d', 'dl'], [15, 17]],
];

export default {
    /**
     * Setup.
     *
     * @return {void}
     */
    setup(props, context) {
        const geometry = new DodecahedronGeometry(props.size);

        geometry.rotateX(degreesToRadians(36));

        useDisposable(geometry);

        /**
         * Reactively track vertices.
         *
         * @const {Object}
         */
        const vertices = ref(geometry.vertices);

        /**
         * Edge length.
         *
         * @const {Object}
         */
        const edgeLength = computed(() => vertices.value[3].distanceTo(vertices.value[4]));

        /**
         * Get corner vector from face triplets.
         *
         * @param {string[]} faces
         *
         * @return {Vector3}
         */
        const corner = (...args) => vertices.value[
            cornerMap.findIndex(arr => hasSameMembers(arr, args))
        ];

        /**
         * Get edge vector from a face pair.
         *
         * @param {string[]} faces
         *
         * @return {Vector3}
         */
        const edge = (...args) => {
            const e = midpointMap.find(([f]) => hasSameMembers(f, args));

            return e && midpoint(vertices.value[e[1][0]], vertices.value[e[1][1]]);
        };

        /**
         * Get center vector of a face.
         *
         * @param {string} face
         *
         * @return {Vector3}
         */
        const center = (face) => {
            // calculate the radius of a circle inscribed in our face
            const r = edgeLength.value / 10 * Math.sqrt(25 + (10 * Math.sqrt(5)));

            // then draw a line of that distance from an edge to the opposite corner
            const [edgeFaces, cornerFaces] = centerMap[face];
            return midpointDistance(edge(...edgeFaces), corner(...cornerFaces), r);
        };

        /**
         * Scale dodecahedron when size changes.
         */
        watch(() => props.size, (newSize, oldSize) => {
            if (oldSize) {
                const scale = 1 - ((oldSize - newSize) / oldSize);
                geometry.scale(scale, scale, scale);
            }
        });

        const obj = new Object3D();

        const { getThreeObj } = useThree(obj, {
            context,
            name: () => props.name,
            position: () => props.position,
            rotation: () => props.rotation,
            scale: () => props.scale,
        });

        return {
            center,
            corner,
            edge,
            faces,
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
