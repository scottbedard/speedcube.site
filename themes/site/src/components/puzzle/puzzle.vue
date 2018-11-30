<template>
    <div
        class="v-puzzle mx-auto"
        :style="{
            maxWidth: `${maxWidth}px`,
        }">
        <pre>{{ isSolved }}</pre>
        <canvas
            ref="canvas"
            :height="`${width}px`"
            :width="`${width}px`"
        />
    </div>
</template>

<script>
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import Cube from 'bedard-cube';

import { forOwn } from 'lodash-es';

import {
    attachStickers,
    degToRad,
    getTurnAxisAndDegrees,
    getTurnObject,
    initCanvas,
    positionStickers,
    resizeRenderer,
} from './canvas';

// update the cube state and run the animations for
// for the next turn in the queue. this function
// recursively calls itself until the queue is empty.
function executeNextTurn(vm) {
    if (vm.isDestroying || vm.isTurning || vm.queue.length === 0) {
        return;
    }

    const currentTurn = vm.cube.parseTurn(vm.queue.shift());
    const turn = getTurnObject(vm, currentTurn);
    const { axis, degrees } = getTurnAxisAndDegrees(currentTurn);

    function play() {
        turn.rotation[axis] = degToRad(vm.currentTurnProgress * degrees);

        render(vm);

        if (vm.currentTurnProgress === 1) {
            vm.cube.turn([currentTurn]);
            vm.currentTurnProgress = 0;
            vm.isTurning = false;

            positionStickers(vm);
            setSolvedState(vm);
            executeNextTurn(vm);
        } else {
            requestAnimationFrame(play);
        }
    }

    vm.isTurning = true;

    updateTurnProgress(vm);
    play();
}

function initialize(vm) {
    // initialize our canvas essentials so we can start rendering
    initCanvas(vm);

    // attach 3d objects for each of our stickers
    attachStickers(vm);

    // position the stickers
    positionStickers(vm);
}

// instantiate a cube, but don't track it with vue's
// reactivity system. we'll manage this ourselves.
function instantiateCube(vm) {
    vm.cube = new Cube(vm.size, { useObjects: true });
}

// render a frame
function render(vm) {
    resizeRenderer(vm);
    
    vm.renderer.render(vm.scene, vm.camera);
}

// set the solved state
function setSolvedState(vm) {
    if (!vm.cube) {
        vm.isSolved = false;
    } else {
        vm.isSolved = vm.cube.isSolved();
    }
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

// increment the current turn progress from 0 to 1
function updateTurnProgress(vm) {
    const fps = 60;

    for (let i = 0; i <= fps; i += 1) {
        const progress = i / fps;
        const timeout = progress * vm.turnDuration;

        setTimeout(() => {
            vm.currentTurnProgress = progress;
        }, timeout);
    }
}

//
// cube
//
export default {
    beforeDestroy() {
        this.queue = [];
        this.isDestroying = true;
    },
    created() {
        // instantiate our cube state
        instantiateCube(this);
    },
    data() {
        return {
            // the current turn being animated
            currentTurn: undefined,

            // the progress of the current turn 0 to 1
            currentTurnProgress: 0,

            // this shuts off animations to prevent memory leaks
            isDestroying: false,

            // determines if the cube is solved. this is
            // re-calculated after each turn
            isSolved: false,

            // determines if a turn is currently being animated
            isTurning: false,

            // turns waiting to be executed
            queue: [],

            // the width of our containing element
            width: 0,
        };
    },
    mounted() {
        // resize when our container's dimensions change
        trackDimensions(this);

        // get the cube ready to be drawn
        initialize(this);

        // draw the first frame
        this.$nextTick(() => render(this));
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
        redraw() {
            initialize(this);
            render(this);
        },
        setCubeState(state) {
            forOwn(state, (values, face) => {
                values.forEach((value, index) => {
                    this.cube.state[face][index].value = value;
                });
            });

            this.redraw();

            setSolvedState(this);
        },
        scramble() {
            this.turn(this.cube.generateScrambleString());
        },
        turn(turns) {
            this.queue.push(...turns.split(' ').map(turn => turn.trim()));

            executeNextTurn(this);
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
        maskColor: {
            default: '#6a7685',
            type: String,
        },
        masked: {
            default: false,
            type: Boolean,
        },
        size: {
            required: true,
            type: Number,
        },
        stickerElevation: {
            default: 0.05,
            type: Number,
        },
        stickerInnerOpacity: {
            default: 0,
            type: Number,
        },
        stickerRadius: {
            default: 0.1,
            type: Number,
        },
        stickerScale: {
            default: 0.9,
            type: Number,
        },
        turnDuration: {
            default: 100,
            type: Number,
        },
    },
    watch: {
        colors: 'redraw',
        masked: 'redraw',
        stickerElevation: 'redraw',
        stickerInnerOpacity: 'redraw',
        stickerRadius: 'redraw',
        stickerScale: 'redraw',
        turnDuration: 'redraw',
        isSolved() {
            this.$emit('complete');
        },
        queue(queue) {
            if (queue.length === 0) {
                this.$emit('idle');
            }
        },
        width() {
            // resize the renderer when our dimensions change
            if (this.renderer) {
                resizeRenderer(this);
            }
        },
    },
};
</script>
