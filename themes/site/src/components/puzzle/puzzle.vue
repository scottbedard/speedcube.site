<template>
    <div
        class="v-puzzle mx-auto"
        :style="{
            maxWidth: `${maxWidth}px`,
        }">
        <canvas
            ref="canvas"
            :height="`${width}px`"
            :width="`${width}px`"
        />
    </div>
</template>

<script>
/* eslint-disable no-param-reassign */
import Cube from 'bedard-cube';

import {
    attachStickers,
    initCanvas,
    positionStickers,
    resizeRenderer,
} from './canvas';

// instantiate a cube, but don't track it with vue's
// reactivity system. we'll manage this ourselves.
function instantiateCube(vm) {
    vm.cube = new Cube(vm.size, { useObjects: true });
}

// render a frame
function render(vm) {
    vm.renderer.render(vm.scene, vm.camera);
}

// track the dimensions of our containing element so the
// cube can responsively adjust to a changing window.
function trackDimensions(vm) {
    function sync() {
        vm.width = vm.$el.offsetWidth;
    }

    sync();

    window.addEventListener('resize', sync);
    vm.$on('hook:destroyed', () => window.removeEventListener('resize', sync));
}

//
// cube
//
export default {
    created() {
        // instantiate our cube state
        instantiateCube(this);
    },
    data() {
        return {
            width: 0,
        };
    },
    mounted() {
        // resize when our container's dimensions change
        trackDimensions(this);

        // initialize our canvas essentials so we can start rendering
        initCanvas(this);

        // attach 3d objects for each of our stickers
        attachStickers(this);

        // position the stickers
        positionStickers(this);

        // temp animation loop
        const animate = () => {
            render(this);

            requestAnimationFrame(animate);
        }

        animate();
    },
    computed: {
        colMap() {
            return new Array(this.size ** 2).fill().map((val, i) => i % this.size);
        },
        cubeSize() {
            // return the pixel size of our cube
            return this.stickerSize * this.size;
        },
        halfCubeSize() {
            // return half the size of our cube
            return this.cubeSize / 2;
        },
        halfStickerSize() {
            // return half the size of a sticker
            return this.stickerSize / 2;
        },
        maxWidth() {
            // return a max width for the cube based on it's size
            return Math.min(768, Math.max(380, this.size * 100));
        },
        rowMap() {
            return new Array(this.size ** 2).fill().map((val, i) => Math.floor(i / this.size));
        },
        stickerSize() {
            // return the pixel size of a sticker
            return this.width / this.size;
        },
    },
    methods: {
        scramble() {
            this.cube.scramble();
        },
    },
    props: {
        colors: {
            default() {
                return [
                    '#ffeb3b', // U -> yellow
                    '#ff9800', // L -> orange
                    '#03a9f4', // F -> blue
                    '#f44336', // R -> red
                    '#4caf50', // B -> green
                    '#eeeeee', // D -> white
                ];
            },
            type: Array,
        },
        size: {
            required: true,
            type: Number,
        },
        stickerInnerDarkening: {
            default: 0.15,
            type: Number,
        },
        stickerRadius: {
            default: 0.1,
            type: Number,
        },
        stickerScale: {
            default: 0.95,
            type: Number,
        },
    },
    watch: {
        width() {
            // resize the renderer when our dimensions change
            if (this.renderer) {
                resizeRenderer(this);
            }
        },
    },
};
</script>
