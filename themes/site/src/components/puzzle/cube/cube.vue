<template>
    <v-obj>
        <v-shape
            v-for="(value, index) in model.state.F"
            :color="0xff0000"
            :geometry="roundedRectangle"
            :key="`F-${index}`"
            :position="indexPosition(index)"
        />

        <!--
        <v-obj :rotation="rotation">
            <v-shape
                :color="0xffff00"
                :geometry="roundedRectangle"
                :position="{ x: -10, y: -10, z: 20 }"
            />
            <v-shape
                :color="0x0000ff"
                :geometry="roundedRectangle"
                :position="{ x: 15, y: -10, z: 20 }"
                :rotation="{ z: -20 }"
            />
        </v-obj>
        -->
    </v-obj>
</template>

<script>
import Cube from 'bedard-cube';
import boxComponent from '@/components/three/box/box.vue';
import objComponent from '@/components/three/obj/obj.vue';
import shapeComponent from '@/components/three/shape/shape.vue';
import { roundedRectangle } from '@/components/three/geometries';
import { get } from 'lodash-es';

export default {
    components: {
        'v-box': boxComponent,
        'v-obj': objComponent,
        'v-shape': shapeComponent,
    },
    computed: {
        colors() {
            return get(this.config, 'colors', [
                '#ff0000',
                '#00ff00',
                '#0000ff',
                '#00ffff',
                '#ffff00',
                '#ffffff',
            ]);
        },
        cubeSize() {
            return (this.stickerSize * this.model.size) + (this.gutterCount * this.gutterSize);
        },
        gutterCount() {
            return this.model.size - 1;
        },
        gutterSize() {
            return this.stickerSize * this.stickerSpacing;
        },
        halfCubeSize() {
            return this.cubeSize / 2;
        },
        halfStickerSize() {
            return this.stickerSize / 2;
        },
        roundedRectangle() {
            return roundedRectangle(this.stickerSize, this.stickerSize, this.stickerSize * this.stickerRadius);
        },
        rotation() {
            return {
                x: 90 * this.turnProgress,
            }
        },
        stickerRadius() {
            return 0.25;
        },
        stickerSize() {
            return 100 / this.model.size;
        },
        stickerSpacing() {
            return get(this.config, 'stickerSpacing', 0.25);
        },
    },
    methods: {
        indexPosition(index) {
            const col = index % this.model.size;
            const row = Math.floor(index / this.model.size);
            const x = -this.halfCubeSize + ((col * this.gutterSize) + (col * this.stickerSize));
            const y = -this.halfCubeSize + ((row * this.gutterSize) + (row * this.stickerSize));
            const z = 0;

            return { x, y, z };
        },
    },
    props: {
        config: {
            default: () => ({}),
            type: Object,
        },
        currentTurn: {
            type: String,
        },
        model: {
            default() {
                return new Cube(4);
            },
            type: Object,
        },
        turnProgress: {
            default: 0,
            type: Number,
        },
    },
    watch: {
        
    },
};
</script>