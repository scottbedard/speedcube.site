<template>
    <div class="text-center">
        <canvas ref="canvas" />

        <div class="my-20">
            <v-button @click="turn('R')" outlined>turn</v-button>
        </div>
    </div>
</template>

<script>
import * as THREE from 'three';
import Cube from './cube';

export default {
    data() {
        return {
            // the width of our containing element
            containerWidth: 0,

            // determines if the puzzle is being turned
            isTurning: false,

            // turns waiting to be executed
            queue: [],
        };
    },
    mounted() {
        this.trackContainerWidth();

        this.reset();
        this.renderPuzzle();
        this.render();
    },
    computed: {
        isCube() {
            return [
                '2x2', '3x3', '4x4',
                '5x5', '6x6', '7x7',
                '8x8', '9x9', '10x10',
            ].includes(this.puzzleId);
        },
        puzzleId() {
            return this.puzzle.trim().toLowerCase();
        },
    },
    methods: {
        createPuzzle() {
            let Puzzle;

            if (this.isCube) {
                Puzzle = Cube;
            } else {
                throw new Error(`Unknown puzzle type '${this.puzzle}'`);
            }

            return new Puzzle(this);
        },
        onQueueChange() {            
            if (!this.isTurning) {
                const turn = this.queue[0];
                
                if (turn) {
                    this.isTurning = true;

                    this.$options.puzzle.turn(turn).then(() => {
                        this.isTurning = false;

                        this.queue.shift();
                    });
                }
            }
        },
        render() {
            // this function updates our canvas with the current frame
            this.$options.renderer.render(this.$options.scene, this.$options.camera);
        },
        renderPuzzle() {
            // this method instructs our puzzle to render itself, but does
            // not actually draw on the canvas. to do that, call render.
            this.$options.puzzle.render();
        },
        reset() {
            // instantiate the puzzle
            this.$options.puzzle = this.createPuzzle();

            // instantiate a renderer and scene
            this.$options.renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true,
                canvas: this.$refs.canvas,
            });

            this.$options.scene = new THREE.Scene();

            // instantiate a camera, and point it at the center of our scene
            this.$options.camera = new THREE.PerspectiveCamera(60, 1, 1, 10000);
            this.$options.camera.position.set(0, 1000, 2000);
            this.$options.camera.lookAt(0, 0, 0);

            // add some lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            const pointLight = new THREE.PointLight(0xffffff, 0.7);

            this.$options.scene.add(ambientLight);
            this.$options.scene.add(pointLight);
            pointLight.position.set(0, 2000, 2000);

            // // axes helper
            // var axesHelper = new THREE.AxesHelper(2500);
            // this.$options.scene.add(axesHelper);

            // render the initial frame
            this.$nextTick(this.render);
        },
        resize() {
            const { height, width } = this.$options.puzzle.getCanvasDimensions();

            this.$options.renderer.setSize(width, height);
        },
        trackContainerWidth() {
            const sync = () => {
                this.containerWidth = this.$el.offsetWidth;
            }

            sync();

            window.addEventListener('resize', sync);

            this.$on('hook:destroyed', () => {
                window.removeEventListener('resize', sync);
            });
        },
        turn(turn) {
            this.queue.push(turn);
        },
    },
    props: {
        turnable: {
            default: true,
            type: Boolean,
        },
        turnConfig: {
            default: () => {},
            type: Object,
        },
        puzzle: {
            required: true,
            type: String,
        },
    },
    watch: {
        containerWidth: 'resize',
        queue: 'onQueueChange',
    },
};
</script>
