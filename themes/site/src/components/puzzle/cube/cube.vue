<template>
    <v-obj>
        <!-- resting stickers -->
        <v-cube-stickers
            :config="normalizedConfig"
            :filter="sticker => turningStickers.includes(sticker) === false"
            :geometry="geometry"
            :materials="materials"
            :model="model"
            :sticker-size="stickerSize"
        />

        <!-- turning stickers -->
        <v-obj :rotation="rotation">
            <v-cube-stickers
                :config="normalizedConfig"
                :filter="sticker => turningStickers.includes(sticker) === true"
                :geometry="geometry"
                :materials="materials"
                :model="model"
                :sticker-size="stickerSize"
            />
        </v-obj>
    </v-obj>
</template>

<script>
import Cube from 'bedard-cube';
import { noop, times, xor } from 'lodash-es';
import { BackSide, FrontSide, MeshLambertMaterial } from 'three';
import objComponent from '@/components/three/obj/obj.vue';
import cubeStickersComponent from './cube_stickers/cube_stickers.vue';
import { getStickersEffectedByTurn } from './utils';
import { roundedSquare } from '@/components/three/geometries';

const defaultConfig = {
    colors: [
        '#FFEE5D', // U
        '#EFAA18', // L
        '#2589E2', // F
        '#EC6157', // R
        '#5CBD60', // B
        '#F0F0F0', // D
    ],
    innerBrightness: 0.9,
    stickerElevation: 0.2,
    stickerRadius: 0.1,
    stickerSpacing: 0.2,
    turnDuration: 100,
};

export default {
    created() {
        this.syncGeometry();
        this.syncMaterials();
    },
    data() {
        return {
            geometry: { dispose: noop },
            materials: [],
        };
    },
    destroyed() {
        this.disposeGeometry();
        this.disposeMaterials();
    },
    components: {
        'v-cube-stickers': cubeStickersComponent,
        'v-obj': objComponent,
    },
    computed: {
        normalizedConfig() {
            return { ...defaultConfig, ...this.config };
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
            const rotation = {
                x: 0,
                y: 0,
                z: 0,
            };

            if (this.turnDetails) {
                const { axis, degrees } = this.turnDetails;

                rotation[axis] = degrees * this.turnProgress;
            }

            return rotation;
        },
        stickerSize() {
            return 100 / this.model.size;
        },
        turnDetails() {
            if (!this.currentTurn) {
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
        turningStickers() {
            // return an array of all stickers in the current turn
            return this.parsedTurn
                ? getStickersEffectedByTurn(this.model, this.parsedTurn)
                : [];
        },
    },
    methods: {
        disposeGeometry() {
            // dispose of our geometry
            this.geometry.dispose();
        },
        disposeMaterials() {
            // dispose of old materials
            this.materials.forEach(({ inner, outer }) => {
                inner.dispose();
                outer.dispose();
            });
        },
        syncGeometry() {
            this.disposeGeometry();

            this.geometry = roundedSquare(this.stickerSize, this.stickerSize * this.normalizedConfig.stickerRadius);
        },
        syncMaterials() {
            const { colors, innerBrightness } = this.normalizedConfig;

            this.disposeMaterials();

            this.materials = times(6).map(i => ({
                inner: new MeshLambertMaterial({
                    color: colors[i],
                    opacity: innerBrightness,
                    side: BackSide,
                    transparent: innerBrightness < 1,
                }),
                outer: new MeshLambertMaterial({
                    color: colors[i],
                    side: FrontSide,
                }),
            }));
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
                return new Cube(3, { useObjects: true });
            },
            type: Object,
        },
        turnProgress: {
            default: 0,
            type: Number,
        },
    },
    watch: {
        normalizedConfig: {
            deep: true,
            handler(newConfig, oldConfig) {
                // sync the geometry if the radius has changed
                if (newConfig.stickerRadius !== oldConfig.stickerRadius) {
                    this.syncGeometry();
                }

                // sync materials if colors or inner opacities have chnaged
                if (
                    xor(newConfig.colors, oldConfig.colors).length
                    || newConfig.innerBrightness !== oldConfig.innerBrightness
                ) {
                    this.syncMaterials();
                }
            },
        },
    },
};
</script>
