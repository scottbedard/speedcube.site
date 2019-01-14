<template>
    <div class="text-center">
        <!--
            this canvas is where our cube will be drawn. our puzzle
            driver is responsible for handling the render logic.
        -->
        <canvas ref="canvas" />

        <!--
            attach a controller if the puzzle is turnable. we are
            listening for the events from a child component in order
            to bind / unbind the event listeners when turnable changes.
        -->
        <v-controller
            v-if="turnable"
            @keyup="onKeyup"
        />
    </div>
</template>

<script>
import * as THREE from 'three';
import Cube from './cube';
import controllerComponent from './controller/controller.vue';

export default {
    data() {
        return {
            // the width of our containing element
            containerWidth: 0,

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
        this.renderPuzzle();
        this.render();
    },
    components: {
        'v-controller': controllerComponent,
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
            this.$options.puzzle.applyState(state);
        },
        createPuzzle() {
            let Puzzle;

            if (this.isCube) {
                Puzzle = Cube;
            } else {
                throw new Error(`Unknown puzzle type '${this.puzzle}'`);
            }

            return new Puzzle(this);
        },
        getInspectionDuration() {
            return this.$options.puzzle.getInspectionDuration();
        },
        isSolved() {
            return this.$options.puzzle.isSolved();
        },
        onKeyup(e) {
            const turn = this.$options.puzzle.getTurnFromKeyboardEvent(e);
            
            if (turn) {
                this.turn(turn);
            }
        },
        onIsMaskedChange() {
            this.renderPuzzle();
            this.render();
        },
        onQueueChange() {            
            if (!this.isTurning) {
                const turn = this.queue[0];
                
                if (turn) {
                    this.isTurning = true;

                    this.$options.puzzle.turn(turn).then(() => {
                        this.isTurning = false;

                        this.queue.shift();

                        if (this.$options.puzzle.isSolved()) {
                            this.$emit('solved');
                        }
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
        pseudoScramble() {
            this.isMasked = true;

            return this.$options.puzzle.pseudoScramble().then(() => {
                this.isMasked = false;
            });
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
            if (this.$options.puzzle.turnIsPermitted(turn)) {
                this.queue.push(turn);

                this.$emit('turn', turn);
            }
        },
    },
    props: {
        turnable: {
            // 0 = no turns permitted
            // 1 = allow puzzle rotations only
            // 2 = allow all turns
            default: 0,
            type: Number,
        },
        turnConfig: {
            default: () => {},
            type: Object,
        },
        puzzle: {
            required: true,
            type: String,
        },
        scrambling: {
            default: false,
            type: Boolean,
        },
    },
    watch: {
        containerWidth: 'resize',
        isMasked: 'onIsMaskedChange',
        queue: 'onQueueChange',
    },
};
</script>
