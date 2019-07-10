<template>
    <v-obj>
        <!--
            render stickers not effected by the current
            turn in their default positions
        -->
        <!-- <v-cube-position
            :col-map="colMap"
            :colors="colors"
            :config="config"
            :filter="sticker => turnStickers.includes(sticker) === false"
            :geometry="geometry"
            :inner-opacity="innerOpacity"
            :model="model"
            :row-map="rowMap"
            :sticker-elevation="stickerElevation"
            :sticker-size="stickerSize"
            :sticker-spacing="stickerSpacing"
            :stickers-per-face="stickersPerFace"
            :turn-stickers="turnStickers"
        /> -->

        <!--
            next, we'll create an object to hold the stickers
            that are being turned and rotate it
        -->
        <v-obj>
            <v-cube-position
                :col-map="colMap"
                :colors="colors"
                :config="config"
                :filter="sticker => turnStickers.includes(sticker)"
                :geometry="geometry"
                :inner-opacity="innerOpacity"
                :model="model"
                :row-map="rowMap"
                :sticker-elevation="stickerElevation"
                :sticker-size="stickerSize"
                :sticker-spacing="stickerSpacing"
                :stickers-per-face="stickersPerFace"
                :turn-stickers="turnStickers"
            />
        </v-obj>
    </v-obj>
</template>

<script>
import Cube from 'bedard-cube';
import cubePositionComponent from './cube_position/cube_position.vue';
import objComponent from '@/components/three/obj/obj.vue';
import { getStickersEffectedByTurn } from './utils';
import { roundedRectangle } from '@/components/three/geometries';
import { get } from 'lodash-es';

const defaultConfig = {
    colors: ['#ff0000', '#00ff00', '#0000ff', '#00ffff', '#ffff00', '#ffffff'],
    stickerElevation: 0.2,
    stickerRadius: 0.2,
}

export default {
    destroyed() {
        this.geometry.dispose();
    },
    components: {
        'v-cube-position': cubePositionComponent,
        'v-obj': objComponent,
    },
    computed: {
        colMap() {
            return new Array(this.stickersPerFace).fill().map((val, i) => i % this.model.size);
        },
        colors() {
            return get(this.config, 'colors', defaultConfig.colors);
        },
        geometry() {
            return roundedRectangle(this.stickerSize, this.stickerSize, this.stickerSize * this.stickerRadius);
        },
        innerOpacity() {
            return get(this.config, 'innerOpacity', 0.8);
        },
        parsedTurn() {
            if (this.currentTurn) {
                return this.model.parseTurn(this.currentTurn);
            }
            
            return null;
        },
        rowMap() {
            return new Array(this.stickersPerFace).fill().map((val, i) => Math.floor(i / this.model.size));
        },
        stickersPerFace() {
            return this.model.size ** 2;
        },
        stickerElevation() {
            return get(this.config, 'stickerElevation', defaultConfig.stickerElevation);
        },
        stickerRadius() {
            return get(this.config, 'stickerRadius', defaultConfig.stickerRadius);
        },
        stickerSize() {
            return 100 / this.model.size;
        },
        stickerSpacing() {
            return get(this.config, 'stickerSpacing', 0.2);
        },
        turnStickers() {
            if (this.parsedTurn) {
                try {
                    return getStickersEffectedByTurn(this);
                } catch (err) {
                    console.error('Invalid turn', this.currentTurn);
                }
            }
            
            return [];
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
                return new Cube(3, {
                    useObjects: true,
                });
            },
            type: Object,
        },
        turnProgress: {
            default: 0,
            type: Number,
        },
    },
    watch: {
        geometry(newGeometry, oldGeometry) {
            oldGeometry.dispose();
        },
    },
};
</script>