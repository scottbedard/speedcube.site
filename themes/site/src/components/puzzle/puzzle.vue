<template>
    <div class="text-center">
        <canvas
            style="border: 4px solid red"
            ref="canvas"
            :height="`${canvasHeight}px`"
            :width="`${canvasWidth}px`"
        />

        <div class="mt-20">
            <v-button @click="render" outlined>Render</v-button>
        </div>
    </div>
</template>

<script>
import Cube from './cube';
import * as THREE from 'three';

export default {
    data() {
        return {
            canvasWidth: 0,
            canvasHeight: 0,
            containerWidth: 0,
        };
    },
    mounted() {
        this.trackContainerWidth();
        
        this.reset();

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
        render() {
            this.$options.puzzle.positionStickers();

            this.$options.renderer.render(this.$options.scene, this.$options.camera);
            
            console.log('rendered');
        },
        reset() {
            // create a renderer
            this.$options.renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true,
                canvas: this.$refs.canvas,
            });

            this.$options.renderer.setPixelRatio(window.devicePixelRatio);

            // create a scene
            this.$options.scene = new THREE.Scene();

            // create a perspective camera and point it at the center
            this.$options.camera = new THREE.PerspectiveCamera(180, 1, 0, 10000);
            this.$options.camera.position.set(0, 500, 500);
            this.$options.camera.lookAt(0, 0, 0);

            // add a bit of lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            const pointLight = new THREE.PointLight(0xffffff, 0.7);

            this.$options.scene.add(ambientLight);
            this.$options.scene.add(pointLight);

            pointLight.position.set(0, 500, 500);

            // axes helper
            var axesHelper = new THREE.AxesHelper(10000);
            
            this.$options.scene.add(axesHelper);

            // create the puzzle
            this.$options.puzzle = this.createPuzzle();

            // resize our canvas
            this.resize();
        },
        resize() {
            const { height, width } = this.$options.puzzle.getCanvasDimensions();

            this.canvasHeight = height;
            this.canvasWidth = width;
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
    },
    props: {
        puzzle: {
            required: true,
            type: String,
        },
    },
    watch: {
        containerWidth: 'resize',
    },
};
</script>
