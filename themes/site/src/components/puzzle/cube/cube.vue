<template>
    <v-obj>
        <!-- stickers not being turned -->
        <v-cube-stickers
            :config="config"
            :geometry="geometry"
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
import { get } from 'lodash-es';

const defaultConfig = {
    colors: ['#ff0000', '#00ff00', '#0000ff', '#00ffff', '#ffff00', '#ffffff'],
    innerBrightness: 90,
    stickerElevation: 0.5,
    stickerRadius: 0.5,
    stickerSpacing: 0.5,
};

export default {
    created() {
        this.syncGeometry();
    },
    data() {
        return {
            geometry: null,
        };
    },
    destroyed() {
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
        },
        geometry(newGeometry, oldGeometry) {
            if (oldGeometry) {
                oldGeometry.dispose();
            }
        },
    },
};
</script>
