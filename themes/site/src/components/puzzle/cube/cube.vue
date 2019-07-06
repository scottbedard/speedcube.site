<template>
    <v-obj :rotation="{ x: 0, y: 0, z: 0 }">

        <!-- u -->
        <v-obj :rotation="{ x: -90 }">
            <v-shape
                v-for="(sticker, index) in model.state.U"
                :color="0xffff00"
                :geometry="geometry"
                :inner-opacity="innerOpacity"
                :key="`U-${index}`"
                :position="stickerPositions[index]"
            />
        </v-obj>

        <!-- l -->
        <v-obj :rotation="{ y: -90 }">
            <v-shape
                v-for="(value, index) in model.state.L"
                :color="0x00ff00"
                :geometry="geometry"
                :inner-opacity="innerOpacity"
                :key="`L-${index}`"
                :position="stickerPositions[index]"
            />
        </v-obj>

        <!-- f -->
        <v-shape
            v-for="(value, index) in model.state.F"
            :color="0xff0000"
            :geometry="geometry"
            :inner-opacity="innerOpacity"
            :key="`F-${index}`"
            :position="stickerPositions[index]"
        />

        <!-- r -->
        <v-obj :rotation="{ y: 90 }">
            <v-shape
                v-for="(value, index) in model.state.R"
                :color="0x0000ff"
                :geometry="geometry"
                :inner-opacity="innerOpacity"
                :key="`L-${index}`"
                :position="stickerPositions[index]"
            />
        </v-obj>

        <!-- b -->
        <v-obj :rotation="{ y: 180 }">
            <v-shape
                v-for="(value, index) in model.state.B"
                :color="0x00ffff"
                :geometry="geometry"
                :inner-opacity="innerOpacity"
                :key="`B-${index}`"
                :position="stickerPositions[index]"
            />
        </v-obj>

        <!-- d -->
        <v-obj :rotation="{ x: 90 }">
            <v-shape
                v-for="(sticker, index) in model.state.D"
                :color="0xffffff"
                :geometry="geometry"
                :inner-opacity="innerOpacity"
                :key="`D-${index}`"
                :position="stickerPositions[index]"
            />
        </v-obj>

        <!--
        <v-obj :rotation="rotation">
            <v-shape
                :color="0xffff00"
                :geometry="geometry"
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
        colMap() {
            return new Array(this.stickersPerFace).fill().map((val, i) => i % this.model.size);
        },
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
            return (this.stickerSize * this.model.size) + (this.gapCount * this.gapSize);
        },
        gapCount() {
            return this.model.size - 1;
        },
        gapSize() {
            return this.stickerSize * this.stickerSpacing;
        },
        geometry() {
            return roundedRectangle(this.stickerSize, this.stickerSize, this.stickerSize * this.stickerRadius);
        },
        halfCubeSize() {
            return this.cubeSize / 2;
        },
        halfStickerSize() {
            return this.stickerSize / 2;
        },
        innerOpacity() {
            return get(this.config, 'innerOpacity', 0.8);
        },
        rowMap() {
            return new Array(this.stickersPerFace).fill().map((val, i) => Math.floor(i / this.model.size));
        },
        stickerElevation() {
            return get(this.config, 'stickerElevation', 0.2);
        },
        stickersPerFace() {
            return this.model.size ** 2;
        },
        stickerPositions() {
            const position = index => {
                const col = this.colMap[index];
                const row = this.rowMap[index];

                return {
                    x: -this.halfCubeSize + (col * this.gapSize) + (col * this.stickerSize),
                    y: (this.halfCubeSize - this.stickerSize) - ((row * this.gapSize) + (row * this.stickerSize)),
                    z: this.halfCubeSize + (this.stickerElevation * this.stickerSize),
                }; 
            }

            return new Array(this.stickersPerFace).fill().map((v, i) => position(i));
        },
        stickerRadius() {
            return get(this.config, 'stickerRadius', 0.2);
        },
        stickerSize() {
            return 100 / this.model.size;
        },
        stickerSpacing() {
            return get(this.config, 'stickerSpacing', 0.2);
        },
    },
    methods: {
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
                return new Cube(3);
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