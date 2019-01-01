<template>
    <div
        class="border-4 border-primary-5 mx-auto"
        :style="{ maxWidth: `${maxPuzzleWidth}px` }">
        <canvas
            ref="canvas"
            :height="`${width}px`"
            :width="`${width}px`"
        />
    </div>
</template>

<script>
import Cube from 'bedard-cube';

import {
    attachStickers,
    degToRad,
    getTurnAxisAndDegrees,
    getTurnObject,
    initCanvas,
    positionStickers,
    resizeRenderer,
} from './canvas';

import defaultConfig from './config';

export default {
    data() {
        return {
            // ...
        };
    },
    mounted() {
        this.reset();

        this.$nextTick(() => this.draw());
    },
    computed: {
        colMap() {
            return new Array(this.size ** 2).fill().map((val, i) => i % this.size);
        },
        halfPuzzleWidth() {
            // pixel width of half the cube. this is used to calculate
            // distances from the puzzle origin to the various faces.
            return this.width / 2;
        },
        halfStickerWidth() {
            // the pixel width for half of a sticker
            return this.stickerWidth / 2;
        },
        maxPuzzleWidth() {
            // the maximum width of our cube, based on it's size
            return Math.min(768, Math.max(380, this.size * 100));
        },
        normalizedConfig() {
            // cube configuration
            return { ...defaultConfig, ...this.config }
        },
        rowMap() {
            return new Array(this.size ** 2).fill().map((val, i) => Math.floor(i / this.size));
        },
        size() {
            // the number of layers in our cube
            return { '2x2': 2, '3x3': 3, '4x4': 4, '5x5': 5 }[this.puzzle] || 3;
        },
        stickerWidth() {
            // this pixel width of a single sticker
            return this.width / this.size;
        },
    },
    methods: {
        draw() {
            resizeRenderer(this);

            this.renderer.render(this.scene, this.camera);
        },
        reset() {
            // this method gets our state and canvas ready to be drawn on.
            // first we'll instantiate a state model, then we'll attach
            // 3d objects for each sticker, and last we'll place them where
            // they belong.
            this.cube = new Cube(this.size, { useObjects: true });

            initCanvas(this);
            attachStickers(this);
            positionStickers(this);
        },
    },
    props: {
        config: {
            default: () => {},
            type: Object,
        },
        puzzle: {
            default: '3x3',
            type: String,
        },
        width: {
            required: true,
            type: Number,
        },
    },
};
</script>
