<template>
    <v-obj>
        <!--
            render stickers not effected by the current
            turn in their default positions
        -->
        <v-cube-position
            :col-map="colMap"
            :colors="colors"
            :config="config"
            :filter="sticker => turnStickers.indexOf(sticker) === -1"
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

        <!--
            next, we'll create an object to hold the stickers
            that are being turned and rotate it
        -->
        <v-obj v-if="parsedTurn" :rotation="rotation">
            <v-cube-position
                :col-map="colMap"
                :colors="colors"
                :config="config"
                :filter="sticker => turnStickers.indexOf(sticker) > -1"
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
import { get } from 'lodash-es';
import cubePositionComponent from './cube_position/cube_position.vue';
import objComponent from '@/components/three/obj/obj.vue';
import { getStickersEffectedByTurn } from './utils';
import { roundedRectangle } from '@/components/three/geometries';

const defaultConfig = {
    colors: ['#ff0000', '#00ff00', '#0000ff', '#00ffff', '#ffff00', '#ffffff'],
    stickerElevation: 0.2,
    stickerRadius: 0.2,
};

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
                const parsedTurn = this.model.parseTurn(this.currentTurn);

                parsedTurn.depth = Math.min(parsedTurn.depth, this.model.size);

                return parsedTurn;
            }

            return null;
        },
        rotation() {
            const { axis, degrees } = this.turnDetails;

            return {
                [axis]: degrees * this.turnProgress,
            };
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
        turnDetails() {
            if (!this.parsedTurn) {
                return null;
            }

            const { target, rotation } = this.parsedTurn;
            let axis;
            let degrees;

            // helper function to get turn degrees. note that the
            // clockwise / counter-clickwise degrees might seem
            // backwards. this is because we're turning from the
            // context of our scene's world axis, not the face.
            /* eslint-disable-next-line no-nested-ternary */
            const deg = (cw, ccw) => (rotation === 2 ? 180 : (rotation === -1 ? ccw : cw));

            if (['X', 'Y', 'Z'].includes(target)) {
                axis = target.toLowerCase();
                degrees = deg(-90, 90);
            } else if (target === 'U') {
                axis = 'y';
                degrees = deg(-90, 90);
            } else if (target === 'L') {
                axis = 'x';
                degrees = deg(90, -90);
            } else if (target === 'F') {
                axis = 'z';
                degrees = deg(-90, 90);
            } else if (target === 'R') {
                axis = 'x';
                degrees = deg(-90, 90);
            } else if (target === 'B') {
                axis = 'z';
                degrees = deg(90, -90);
            } else if (target === 'D') {
                axis = 'y';
                degrees = deg(90, -90);
            }

            return { axis, degrees };
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
