<template>
    <v-obj>
        <!-- stickers not being turned -->
        <v-cube-stickers
            :config="config"
            :geometry="geometry"
            :materials="materials"
            :model="model"
            :sticker-size="stickerSize"
        />
    </v-obj>
</template>

<script>
import Cube from 'bedard-cube';
import objComponent from '@/components/three/obj/obj.vue';
import cubeStickersComponent from './cube_stickers/cube_stickers.vue';
import { getStickersEffectedByTurn } from './utils';
import { roundedSquare } from '@/components/three/geometries';
import { get, times } from 'lodash-es';

import {
    BackSide,
    FrontSide,
    Group,
    Mesh,
    MeshLambertMaterial,
} from 'three';

const defaultConfig = {
    colors: ['#ff0000', '#00ff00', '#0000ff', '#00ffff', '#ffff00', '#ffffff'],
    innerBrightness: 0.8,
    stickerElevation: 0.5,
    stickerRadius: 0.5,
    stickerSpacing: 0.5,
};

export default {
    created() {
        this.syncGeometry();
        this.syncMaterials();
    },
    data() {
        return {
            geometry: null,
            materials: [],
        };
    },
    destroyed() {
        this.disposeMaterials();

        if (this.geometry) {
            this.geometry.dispose();
        }
    },
    components: {
        'v-cube-stickers': cubeStickersComponent,
        'v-obj': objComponent,
    },
    computed: {
        normalizedConfig() {
            return { ...defaultConfig, ...this.config };
        },
        stickerSize() {
            return 100 / this.model.size;
        },
    },
    methods: {
        disposeMaterials() {
            // dispose of old materials
            this.materials.forEach(({ inner, outer }) => {
                inner.dispose();
                outer.dispose();
            });
        },
        syncGeometry() {
            // only recompute our geometry if relevant props have changed.
            // we cannot use a computed property for this because it would
            // be re-evaluated whenever any of our props are changed.
            if (
                !this.geometry || 
                this.geometry.userData.stickerSize !== this.stickerSize ||
                this.geometry.userData.stickerRadius !== this.normalizedConfig.stickerRadius
            ) {
                this.geometry = roundedSquare(this.stickerSize, this.stickerSize * this.normalizedConfig.stickerRadius);

                this.geometry.userData.stickerSize = this.stickerSize;
                this.geometry.userData.stickerRadius = this.normalizedConfig.stickerRadius;
            }
        },
        syncMaterials() {
            // @todo: short circuit this function if the colors or innerBrightness
            //        have not changed since the last material creation.
            const { colors, innerBrightness } = this.normalizedConfig;

            this.disposeMaterials();

            this.materials = times(6).map(i => {
                return {
                    inner: new MeshLambertMaterial({
                        color: colors[i],
                        opacity: innerBrightness,
                        side: BackSide,
                        transparent: true,
                    }),
                    outer: new MeshLambertMaterial({
                        color: colors[i],
                        side: FrontSide,
                    }),
                };
            });
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
        config() {
            this.syncGeometry();
            this.syncMaterials();
        },
        geometry(newGeometry, oldGeometry) {
            if (oldGeometry) {
                oldGeometry.dispose();
            }
        },
    },
};
</script>
