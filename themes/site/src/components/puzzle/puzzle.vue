<template>
    <div class="text-center">
        <canvas
            style="border: 4px solid red"
            ref="canvas"
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
            containerWidth: 0,
        };
    },
    mounted() {
        this.trackContainerWidth();

        this.reset();
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
            this.$options.renderer.render(this.$options.scene, this.$options.camera);
        },
        reset() {
            // instantiate a puzzle, renderer, scene, and camera
            this.$options.puzzle = this.createPuzzle();

            this.$options.renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true,
                canvas: this.$refs.canvas,
            });

            this.$options.scene = new THREE.Scene();

            this.$options.camera = new THREE.PerspectiveCamera(60, 1, 1, 1000);
            
            // position the camera
            this.$options.camera.position.set(0, 5, 10);
            this.$options.camera.lookAt(0, 0, 0);

            var light = new THREE.DirectionalLight(0xffffff, 0.55);
            light.position.set(0, 0, 1);
            this.$options.scene.add(light);

            var axesHelper = new THREE.AxesHelper(5);
            this.$options.scene.add(axesHelper);

            var geometry = new THREE.BoxGeometry(5, 5, 5);
            var material = new THREE.MeshPhongMaterial({ color: 0xfff000 });
            var cube = new THREE.Mesh(geometry, material);
            this.$options.scene.add(cube);

            var light = new THREE.DirectionalLight(0xffffff, 0.55);
            light.position.set(0, 0, 1);
            this.$options.scene.add(light);

            var axesHelper = new THREE.AxesHelper(10);
            this.$options.scene.add(axesHelper);

            var render = () => {
                requestAnimationFrame( render );

                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;

                this.render();
            };

            render();
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
