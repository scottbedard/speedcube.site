<template>
    <v-obj>
        <!-- u -->
        <v-obj :rotation="{ x: -90 }">
            <v-shape
                v-for="(sticker, index) in stickers('U')"
                :color="0xffff00"
                :geometry="geometry"
                :inner-opacity="innerOpacity"
                :key="`U-${index}`"
                :position="stickerPosition('U', sticker)"
            />
        </v-obj>

        <!-- l -->
        <v-obj :rotation="{ y: -90 }">
            <v-shape
                v-for="(sticker, index) in  stickers('L')"
                :color="0x00ff00"
                :geometry="geometry"
                :inner-opacity="innerOpacity"
                :key="`L-${index}`"
                :position="stickerPosition('L', sticker)"
            />
        </v-obj>

        <!-- f -->
        <v-shape
            v-for="(sticker, index) in stickers('F')"
            :color="0xff0000"
            :geometry="geometry"
            :inner-opacity="innerOpacity"
            :key="`F-${index}`"
            :position="stickerPosition('F', sticker)"
        />

        <!-- r -->
        <v-obj :rotation="{ y: 90 }">
            <v-shape
                v-for="(sticker, index) in stickers('R')"
                :color="0x0000ff"
                :geometry="geometry"
                :inner-opacity="innerOpacity"
                :key="`L-${index}`"
                :position="stickerPosition('R', sticker)"
            />
        </v-obj>

        <!-- b -->
        <v-obj :rotation="{ y: 180 }">
            <v-shape
                v-for="(sticker, index) in stickers('B')"
                :color="0x00ffff"
                :geometry="geometry"
                :inner-opacity="innerOpacity"
                :key="`B-${index}`"
                :position="stickerPosition('B', sticker)"
            />
        </v-obj>

        <!-- d -->
        <v-obj :rotation="{ x: 90 }">
            <v-shape
                v-for="(sticker, index) in stickers('D')"
                :color="0xffffff"
                :geometry="geometry"
                :inner-opacity="innerOpacity"
                :key="`D-${index}`"
                :position="stickerPosition('D', sticker)"
            />
        </v-obj>
    </v-obj>
</template>

<script>
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
        cubeSize() {
            return (this.stickerSize * this.model.size) + (this.gapCount * this.gapSize);
        },
        gapCount() {
            return this.model.size - 1;
        },
        gapSize() {
            return this.stickerSize * this.stickerSpacing;
        },
        halfCubeSize() {
            return this.cubeSize / 2;
        },
        halfStickerSize() {
            return this.stickerSize / 2;
        },
        stickers() {
            return face => this.model.state[face].filter(this.filter);
        },
        stickerIndex() {
            return (face, sticker) => this.model.state[face].findIndex(sticker);
        },
        stickerPosition() {
            return (face, sticker) => {
                const stickerIndex = this.model.state[face].findIndex(el => el === sticker);

                return this.stickerPositions[stickerIndex];
            }
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
    },
    props: [
        'colMap',
        'colors',
        'config',
        'filter',
        'geometry',
        'innerOpacity',
        'model',
        'rowMap',
        'stickerElevation',
        'stickerSize',
        'stickerSpacing',
        'stickersPerFace',
        'turnStickers',
    ],
};
</script>
