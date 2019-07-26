<template>
    <v-obj>
        <!-- U -->
        <v-obj :rotation="{ x: -90 }">
            <v-shape
                v-for="(sticker, index) in model.state.U"
                :color="0x00ff00"
                :geometry="geometry"
                :inner-material="innerMaterial(sticker.value)"
                :key="`U${index}`"
                :outer-material="outerMaterial(sticker.value)"
                :position="position(index)"
                :visible="filter(sticker)"
            />
        </v-obj>

        <!-- L -->
        <v-obj :rotation="{ y: -90 }">
            <v-shape
                v-for="(sticker, index) in model.state.L"
                :color="0xff0000"
                :geometry="geometry"
                :inner-material="innerMaterial(sticker.value)"
                :key="`L${index}`"
                :outer-material="outerMaterial(sticker.value)"
                :position="position(index)"
                :visible="filter(sticker)"
            />
        </v-obj>

        <!-- F -->
        <v-shape
            v-for="(sticker, index) in model.state.F"
            :color="0xffff00"
            :geometry="geometry"
            :inner-material="innerMaterial(sticker.value)"
            :key="`F${index}`"
            :outer-material="outerMaterial(sticker.value)"
            :position="position(index)"
            :visible="filter(sticker)"
        />

        <!-- R -->
        <v-obj :rotation="{ y: 90 }">
            <v-shape
                v-for="(sticker, index) in model.state.R"
                :color="0x0000ff"
                :geometry="geometry"
                :inner-material="innerMaterial(sticker.value)"
                :key="`R${index}`"
                :outer-material="outerMaterial(sticker.value)"
                :position="position(index)"
                :visible="filter(sticker)"
            />
        </v-obj>

        <!-- B -->
        <v-obj :rotation="{ y: 180 }">
            <v-shape
                v-for="(sticker, index) in model.state.B"
                :color="0x00ffff"
                :geometry="geometry"
                :inner-material="innerMaterial(sticker.value)"
                :key="`B${index}`"
                :outer-material="outerMaterial(sticker.value)"
                :position="position(index)"
                :visible="filter(sticker)"
            />
        </v-obj>

        <!-- D -->
        <v-obj :rotation="{ x: 90 }">
            <v-shape
                v-for="(sticker, index) in model.state.D"
                :color="0xff00ff"
                :geometry="geometry"
                :inner-material="innerMaterial(sticker.value)"
                :key="`D${index}`"
                :outer-material="outerMaterial(sticker.value)"
                :position="position(index)"
                :visible="filter(sticker)"
            />
        </v-obj>
    </v-obj>
</template>

<script>
import { mapColumns, mapRows } from '../utils';
import objComponent from '@/components/three/obj/obj.vue';
import shapeComponent from '@/components/three/shape/shape.vue';

export default {
    components: {
        'v-obj': objComponent,
        'v-shape': shapeComponent,
    },
    computed: {
        cubeSize() {
            return (this.stickerSize * this.model.size) + (this.gapCount * this.gapSize);
        },
        halfCubeSize() {
            return this.cubeSize / 2;
        },
        halfStickerSize() {
            return this.stickerSize / 2;
        },
        gapCount() {
            return this.model.size - 1;
        },
        gapSize() {
            return this.stickerSize * this.config.stickerSpacing;
        },
        innerMaterial() {
            return value => this.materials[value].inner;
        },
        outerMaterial() {
            return value => this.materials[value].outer;
        },
        position() {
            // determine the coordinates of a sticker based on the index and config
            const colMap = mapColumns(this.model.size);
            const rowMap = mapRows(this.model.size);

            return (index) => {
                const col = colMap[index];
                const row = rowMap[index];

                return {
                    x: -this.halfCubeSize + (col * this.gapSize) + (col * this.stickerSize),
                    y: (this.halfCubeSize - this.stickerSize) - ((row * this.gapSize) + (row * this.stickerSize)),
                    z: this.halfCubeSize + (this.config.stickerElevation * this.stickerSize),
                };
            };
        },
    },
    props: [
        'config',
        'filter',
        'geometry',
        'materials',
        'model',
        'stickerSize',
    ],
};
</script>
