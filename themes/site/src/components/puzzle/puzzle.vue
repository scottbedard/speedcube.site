

<template>
    <div class="v-puzzle max-w-sm mx-auto">
        <pre>{{ $data }}</pre>
    </div>
</template>

<script>
// @todo: optimize this import statement to only pull in
//        the pieces of three.js that we're actually using
import * as THREE from 'three';

import Cube from 'bedard-cube';

import {
    degToRad,
    getCol,
    getRow,
    createMesh
} from './helpers';

export default {
    created() {
        this.cube = new Cube(this.size, {
            useObjects: true,
        });
    },
    data() {
        return {
            height: 0,
            width: 0,
        };
    },
    mounted() {
        // track our parent elements dimensions to make
        // the cube resize when the screen changes.
        this.trackParentDimensions();

        // create the canvas that we'll render the cube in
        this.createCanvas();

        // create and position the stickers for our cube
        this.createStickers();

        // and finally, render the cube
        this.draw();
    },
    computed: {
        cubeSize() {
            return this.stickerSize * this.size;
        },
        halfCubeSize() {
            return this.cubeSize / 2;
        },
        stickerSize() {
            return (this.width / this.size) * .15;
        },
    },
    methods: {
        createCanvas() {
            // create a scene
            this.scene = new THREE.Scene();

            // create and position a camera
            this.camera = new THREE.PerspectiveCamera(60, 1, 1, 1000);
            this.camera.position.set(0, 65, 100);
            this.camera.lookAt(0, 0, 0);

            // create a renderer
            this.renderer = new THREE.WebGLRenderer({
                antialias: true,
            });

            this.resizeRenderer();

            // add an axis helper
            this.scene.add(new THREE.AxesHelper(200));

            // attach our canvas to the dom
            this.$el.appendChild(this.renderer.domElement);
        },
        createStickers() {
            this.cube.stickers(sticker => {
                console.log(this.colors[sticker.value]);
                sticker.mesh = createMesh(this.stickerSize, this.stickerRadius, this.colors[sticker.value]);
            });
        },
        draw() {
            // position the stickers
            this.positionStickers();

            // // create a 3d object and attach it to our scene
            // // this will be what we rotate to display the current turn
            // const obj = new THREE.Object3D();
            // this.scene.add(obj);

            // // create a plane for each sticker on the cube
            // const p1 = createMesh(25, this.stickerRadius, '#ff0');
            // const p2 = createMesh(25, this.stickerRadius, '#f0f');
            // const p3 = createMesh(25, this.stickerRadius, '#0ff');

            // // console.log ('p2', p2);

            // // translate the stickers to their normal position
            // // orient all stickers according to their current face
            // p1.translateZ(50);
            // p1.translateX(-30);

            // p2.translateZ(50);

            // p3.translateZ(50);
            // p3.translateX(30);

            // // attach any uneffected stickers to our scene
            // this.scene.add(p1);
            // this.scene.add(p2);

            // // attach any stickers that are part of the current turn to our 3d obj
            // obj.add(p2);
            // obj.add(p3);

            // start animating
            const animate = () => {
                // obj.rotation.x += 0.0125;

                this.renderFrame();

                // requestAnimationFrame(animate);
            };

            animate();
        },
        positionStickers() {
            // attach all stickers to the scene
            this.cube.stickers(sticker => this.scene.add(sticker.mesh));

            // up
            this.cube.state.u.forEach(sticker => {
                sticker.mesh.translateY(this.halfCubeSize);
                sticker.mesh.rotateX(degToRad(-90));
            });

            // left
            this.cube.state.l.forEach(sticker => {
                sticker.mesh.translateX(-this.halfCubeSize);
                sticker.mesh.rotateY(degToRad(-90));
            });

            // front
            this.cube.state.f.forEach(sticker => {
                sticker.mesh.translateZ(this.halfCubeSize);
            });

            // right
            this.cube.state.r.forEach(sticker => {
                sticker.mesh.translateX(this.halfCubeSize);
                sticker.mesh.rotateY(degToRad(90));
            });

            // back
            this.cube.state.b.forEach(sticker => {
                sticker.mesh.translateZ(-this.halfCubeSize);
                sticker.mesh.rotateY(degToRad(180));
            });

            // down
            this.cube.state.d.forEach(sticker => {
                sticker.mesh.translateY(-this.halfCubeSize);
                sticker.mesh.rotateX(degToRad(90));
            });
        },
        renderFrame() {
            this.renderer.render(this.scene, this.camera);
        },
        resizeRenderer() {
            this.renderer.setSize(this.width, this.width);
        },
        trackParentDimensions() {
            const sync = () => {
                this.height = this.$el.offetHeight;
                this.width = this.$el.offsetWidth;
            };

            sync();

            window.addEventListener('resize', sync);

            this.$on('hook:destroyed', () => {
                window.removeEventListener('resize', sync);
            });
        },
        turn(turn) {
            console.log('ok', turn);
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
        stickerRadius: {
            default: 4,
            type: Number,
        },
    },
    watch: {
        height: 'resizeRenderer',
        width: 'resizeRenderer',
    },
};
</script>
