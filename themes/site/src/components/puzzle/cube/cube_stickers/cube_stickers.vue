<template>
    <v-obj>
        <!-- u -->
        <v-obj :rotation="{ x: -90 }">
            <v-shape
                v-for="(sticker, index) in face('U')"
                :color="colors[sticker.value]"
                :geometry="geometry"
                :inner-opacity="innerOpacity"
                :key="`U-${index}`"
                :position="stickerPosition('U', sticker)"
                :visible="visible(sticker)"
            />
        </v-obj>

        <!-- l -->
        <v-obj :rotation="{ y: -90 }">
            <v-shape
                v-for="(sticker, index) in face('L')"
                :color="colors[sticker.value]"
                :geometry="geometry"
                :inner-opacity="innerOpacity"
                :key="`L-${index}`"
                :position="stickerPosition('L', sticker)"
                :visible="visible(sticker)"
            />
        </v-obj>

        <!-- f -->
        <v-shape
            v-for="(sticker, index) in face('F')"
            :color="colors[sticker.value]"
            :geometry="geometry"
            :inner-opacity="innerOpacity"
            :key="`F-${index}`"
            :position="stickerPosition('F', sticker)"
            :visible="visible(sticker)"
        />

        <!-- r -->
        <v-obj :rotation="{ y: 90 }">
            <v-shape
                v-for="(sticker, index) in face('R')"
                :color="colors[sticker.value]"
                :geometry="geometry"
                :inner-opacity="innerOpacity"
                :key="`L-${index}`"
                :position="stickerPosition('R', sticker)"
                :visible="visible(sticker)"
            />
        </v-obj>

        <!-- b -->
        <v-obj :rotation="{ y: 180 }">
            <v-shape
                v-for="(sticker, index) in face('B')"
                :color="colors[sticker.value]"
                :geometry="geometry"
                :inner-opacity="innerOpacity"
                :key="`B-${index}`"
                :position="stickerPosition('B', sticker)"
                :visible="visible(sticker)"
            />
        </v-obj>

        <!-- d -->
        <v-obj :rotation="{ x: 90 }">
            <v-shape
                v-for="(sticker, index) in face('D')"
                :color="colors[sticker.value]"
                :geometry="geometry"
                :inner-opacity="innerOpacity"
                :key="`D-${index}`"
                :position="stickerPosition('D', sticker)"
                :visible="visible(sticker)"
            />
        </v-obj>
    </v-obj>
</template>

<script>
import boxComponent from '@/components/three/box/box.vue';
import objComponent from '@/components/three/obj/obj.vue';
import shapeComponent from '@/components/three/shape/shape.vue';

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
        face() {
            return face => this.model.state[face];
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
            return face => this.face(face).filter(this.filter);
        },
        stickerIndex() {
            return (face, sticker) => this.face(face).findIndex(sticker);
        },
        stickerPosition() {
            return (face, sticker) => {
                const stickerIndex = this.face(face).findIndex(el => el === sticker);

                return this.stickerPositions[stickerIndex];
            };
        },
        stickerPositions() {
            // determine the coordinates of a sticker based
            // on the index and the puzzle configuration
            const position = (index) => {
                const col = this.colMap[index];
                const row = this.rowMap[index];

                return {
                    x: -this.halfCubeSize + (col * this.gapSize) + (col * this.stickerSize),
                    y: (this.halfCubeSize - this.stickerSize) - ((row * this.gapSize) + (row * this.stickerSize)),
                    z: this.halfCubeSize + (this.stickerElevation * this.stickerSize),
                };
            };

            return new Array(this.stickersPerFace).fill().map((v, i) => position(i));
        },
        visible() {
            // determine if a sticker is visible or not
            return sticker => this.visibleStickers.indexOf(sticker) > -1;
        },
        visibleStickers() {
            // an array of all visible stickers
            return this.stickers('U')
                .concat(this.stickers('L'))
                .concat(this.stickers('F'))
                .concat(this.stickers('R'))
                .concat(this.stickers('B'))
                .concat(this.stickers('D'));
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
