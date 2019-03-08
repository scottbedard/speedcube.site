<style lang="scss" scoped>
.idle {
    // wobble the puzzle along a sine wave
    animation: wobble 2s alternate infinite ease-in-out;
}

@keyframes wobble {
    to {
        transform: translatey(1rem);
    }
}
</style>

<template>
    <div class="text-center" :class="{ idle }">
        <canvas ref="canvas" />
    </div>
</template>

<script>
import * as THREE from 'three';
import { jsonToObject } from '@/app/utils/object';
import Cube from './cube';

export default {
    data() {
        return {
            // the width of our containing element
            containerWidth: 0,

            // default puzzle config
            defaultConfig: {},

            // masks the puzzle making all stickers the same color
            isMasked: false,

            // determines if the puzzle is being turned
            isTurning: false,

            // turns waiting to be executed
            queue: [],
        };
    },
    mounted() {
        this.trackContainerWidth();

        this.reset();
    },
    computed: {
        isCube() {
            return ['2x2', '3x3', '4x4', '5x5'].includes(this.puzzleId);
        },
        puzzleId() {
            return this.puzzle.trim().toLowerCase();
        },
    },
    methods: {
        applyState(state) {
            state = jsonToObject(state);

            if (this.$options.puzzle) {
                this.$options.puzzle.applyState(state);
            }
        },
        createPuzzle() {
            let Puzzle;

            if (this.isCube) {
                Puzzle = Cube;
            } else {
                throw new Error(`Unknown puzzle type '${this.puzzle}'`);
            }

            // instantiate our puzzle and fire a ready event on nextTick
            const instance = new Puzzle(this);

            this.$nextTick(() => this.$emit('ready', this));

            return instance;
        },
        flushQueuedTurns() {
            this.queue = [];
        },
        getInspectionDuration() {
            return this.$options.puzzle.getInspectionDuration();
        },
        getTurnFromKeyboardEvent(e) {
            return this.$options.puzzle.getTurnFromKeyboardEvent(e);
        },
        isInspectionTurn(turn) {
            return this.$options.puzzle.isInspectionTurn(turn);
        },
        isSolved() {
            return this.$options.puzzle.isSolved();
        },
        onIsMaskedChange() {
            this.prepareNextFrame();
            this.render();
        },
        onQueueChange() {
            if (!this.isTurning) {
                const turn = this.queue[0];

                if (turn) {
                    this.isTurning = true;
                    this.$emit('turn-start', turn);

                    let valid = true;

                    const turnPromise = this.$options.puzzle.turn(turn).finally(() => {
                        this.isTurning = false;
                        this.queue.shift();

                        this.$emit('turn-end', this.isSolved());
                    });
                }
            }
        },
        prepareNextFrame() {
            // this method instructs our puzzle to render itself, but does
            // not actually draw on the canvas. to do that, call render.
            if (this.$options.puzzle) {
                this.$options.puzzle.prepareNextFrame();
            }
        },
        render() {
            // this function updates our canvas with the current frame
            if (this.$options.renderer) {
                this.$options.renderer.render(this.$options.scene, this.$options.camera);
            }
        },
        reset() {
            // do nothing if we have no puzzle
            if (this.puzzle === '') {
                return;
            }

            // instantiate the puzzle
            this.$options.puzzle = this.createPuzzle();
            this.defaultConfig = this.$options.puzzle.getDefaultConfig();

            // instantiate a renderer and scene
            this.$options.renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true,
                canvas: this.$refs.canvas,
            });

            this.$options.scene = new THREE.Scene();

            // instantiate a camera, and point it at the center of our scene
            this.$options.camera = new THREE.PerspectiveCamera(60, 1, 1, 10000);

            // add some lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            const pointLight = new THREE.PointLight(0xffffff, 0.7);

            this.$options.scene.add(ambientLight);
            this.$options.scene.add(pointLight);
            pointLight.position.set(0, 2000, 2000);

            // // axes helper
            // var axesHelper = new THREE.AxesHelper(2500);
            // this.$options.scene.add(axesHelper);

            this.$nextTick(() => {
                this.positionCamera();
                this.prepareNextFrame();
                this.render();
            });
        },
        resize() {
            // do nothing if we have no puzzle
            if (this.puzzle === '') {
                return;
            }

            const { height, width } = this.$options.puzzle.getCanvasDimensions();

            this.$options.renderer.setSize(width, height);
        },
        positionCamera() {
            if (this.$options.puzzle) {
                this.$options.puzzle.positionCamera();
            }
        },
        pseudoScramble() {
            this.isMasked = true;

            return this.$options.puzzle.pseudoScramble().then(() => {
                this.isMasked = false;
            });
        },
        trackContainerWidth() {
            const sync = () => {
                this.containerWidth = this.$el.offsetWidth;
            };

            sync();

            window.addEventListener('resize', sync);

            this.$on('hook:destroyed', () => {
                window.removeEventListener('resize', sync);
            });
        },
        turn(turn) {
            if (this.$options.puzzle.isValidTurn(turn)) {
                this.queue.push(turn);
            }
        },
    },
    props: {
        config: {
            default: () => {},
            type: Object,
        },
        idle: {
            default: false,
            type: Boolean,
        },
        keyboardConfig: {
            default: () => {},
            type: Object,
        },
        puzzle: {
            default: '',
            required: true,
            type: String,
        },
        turnDuration: {
            type: Number,
        },
    },
    watch: {
        config: {
            deep: true,
            handler() {
                this.positionCamera();
                this.prepareNextFrame();
                this.render();
            },
        },
        containerWidth: 'resize',
        defaultConfig(defaultConfig) {
            this.$emit('default-config', defaultConfig);
        },
        isMasked: 'onIsMaskedChange',
        puzzle() {
            this.reset();
            this.resize();
        },
        queue: 'onQueueChange',
    },
};
</script>
