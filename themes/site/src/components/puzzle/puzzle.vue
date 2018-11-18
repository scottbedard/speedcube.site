<template>
    <div
        class="v-puzzle mx-auto"
        :style="{
            maxWidth: `${maxWidth}px`,
        }">
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
} from './helpers';

// cache some degree calculations
const degNeg90 = degToRad(-90);
const deg90 = degToRad(90);
const deg180 = degToRad(180);

export default {
    created() {
        this.cube = new Cube(this.size, {
            useObjects: true,
        });
    },
    data() {
        return {
            // the current turn being animated
            currentTurn: undefined,

            // progress of the current turn (0 to 1)
            currentTurnProgress: 0,

            // this determines if the requestAnimationFrame loop is running
            isTurning: false,

            // the width of our parent element
            width: 0,

            // turns waiting to be executed
            queue: [],
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
        this.positionStickers();
        this.renderFrame();
    },
    computed: {
        colMap() {
            return new Array(this.size ** 2).fill(undefined).map((val, i) => getCol(this.size, i));
        },
        cubeSize() {
            return this.stickerSize * this.size;
        },
        halfCubeSize() {
            return this.cubeSize / 2;
        },
        halfStickerSize() {
            return this.stickerSize / 2;
        },
        maxWidth() {
            return Math.min(768, Math.max(420, this.size * 100));
        },
        rowMap() {
            return new Array(this.size ** 2).fill(undefined).map((val, i) => getRow(this.size, i));
        },
        stickerSize() {
            return this.width / this.size;
        },
    },
    methods: {
        animateNextTurn() {
            // do nothing if the cube is already being turned
            if (this.isTurning || this.queue.length === 0) {
                return;
            }

            // otherwise create a new turn and start animating it
            this.isTurning = true;

            const turnObj = this.getTurnObject();
            const currentTurn = this.queue.shift();

            this.scene.add(turnObj);

            // update our turn progress according to our turn speed
            this.processTurn();

            // create a requestAnimationFrame loop to update our canvas
            const animate = () => {

                // render the next frame, or get ready for the next turn
                if (this.currentTurnProgress === 1) {
                    this.currentTurnProgress = 0;
                    this.isTurning = false;
                    this.animateNextTurn();
                } else {
                    requestAnimationFrame(animate);
                }
            }

            animate();
    
            // // otherwise start animating the current turn
            // this.cube.turn = new THREE.Object3D();
            // this.scene.add(this.cube.turn);

            // this.cube.state.f.forEach(sticker => {
            //     this.cube.turn.add(sticker.mesh);
            // });

            // const animate = () => {
            //     this.rotateStickers();

            //     if (this.isTurning) {
            //         requestAnimationFrame(animate);
            //     }
            // }

            // animate();
        },
        createCanvas() {
            // create a scene
            this.scene = new THREE.Scene();

            // create and position a camera
            this.camera = new THREE.PerspectiveCamera(60, 1, 1, 10000);
            this.camera.position.set(0, 400, this.stickerSize * this.size * 1.8);
            this.camera.lookAt(0, 0, 0);

            // create a renderer
            this.renderer = new THREE.WebGLRenderer({
                antialias: true,
            });

            // set the initial size of our canvas
            this.resize();

            // add an axis helper
            this.scene.add(new THREE.AxesHelper(600));

            // attach our canvas to the dom
            this.$el.appendChild(this.renderer.domElement);
        },
        createStickers() {
            const shape = new THREE.Shape();
            const offset = -(this.stickerSize / 2);
            const offsetSize = offset + this.stickerSize;
            const radius = this.stickerSize * this.stickerRadius;

            shape.moveTo(offset, offset + radius);
            shape.lineTo(offset, offsetSize - radius);
            shape.quadraticCurveTo(offset, offsetSize, offset + radius, offsetSize);
            shape.lineTo(offsetSize - radius, offsetSize);
            shape.quadraticCurveTo(offsetSize, offsetSize, offsetSize, offsetSize - radius);
            shape.lineTo(offsetSize, offset + radius);
            shape.quadraticCurveTo(offsetSize, offset, offsetSize - radius, offset);
            shape.lineTo(offset + radius, offset);
            shape.quadraticCurveTo(offset, offset, offset, offset + radius);

            this.cube.stickers((sticker) => {
                /* eslint-disable no-param-reassign */
                sticker.mesh = new THREE.Mesh(
                    new THREE.ShapeBufferGeometry(shape),
                    new THREE.MeshBasicMaterial({ color: this.colors[sticker.value], side: THREE.DoubleSide }),
                );

                sticker.mesh.scale.set(this.stickerScale, this.stickerScale, 1);
                /* eslint-enable no-param-reassign */
            });
        },
        getTurnObject() {
            const turn = new THREE.Object3D();
            
            return turn;
        },
        positionStickers() {
            // attach all stickers to the scene
            this.cube.stickers(sticker => this.scene.add(sticker.mesh));

            const offset = -(this.halfCubeSize - this.halfStickerSize);

            const translateSticker = (sticker, i) => {
                const x = offset + (this.colMap[i] * this.stickerSize);
                const y = offset + (this.rowMap[i] * this.stickerSize);

                if (x) {
                    sticker.mesh.translateX(x);
                }

                if (y) {
                    sticker.mesh.translateY(y);
                }
            };

            // up
            this.cube.state.u.forEach((sticker, index) => {
                sticker.mesh.translateY(this.halfCubeSize);
                sticker.mesh.rotateX(deg90);
                translateSticker(sticker, index);
            });

            // left
            this.cube.state.l.forEach((sticker, index) => {
                sticker.mesh.translateX(-this.halfCubeSize);
                sticker.mesh.rotateY(degNeg90);
                sticker.mesh.rotateX(deg180);
                translateSticker(sticker, index);
            });

            // front
            this.cube.state.f.forEach((sticker, index) => {
                sticker.mesh.translateZ(this.halfCubeSize);
                sticker.mesh.rotateX(deg180);
                translateSticker(sticker, index);
            });

            // right
            this.cube.state.r.forEach((sticker, index) => {
                sticker.mesh.translateX(this.halfCubeSize);
                sticker.mesh.rotateY(degToRad(90));
                sticker.mesh.rotateX(deg180);
                translateSticker(sticker, index);
            });

            // back
            this.cube.state.b.forEach((sticker, index) => {
                sticker.mesh.translateZ(-this.halfCubeSize);
                sticker.mesh.rotateX(deg180);
                sticker.mesh.rotateY(deg180);
                translateSticker(sticker, index);
            });

            // // down
            this.cube.state.d.forEach((sticker, index) => {
                sticker.mesh.translateY(-this.halfCubeSize);
                sticker.mesh.rotateX(degNeg90);
                translateSticker(sticker, index);
            });
        },
        processTurn() {
            const fps = 60;
            
            for (let i = 0; i <= fps; i++) {
                const progress = i / fps;
                const timeout = progress * this.speed;

                setTimeout(() => {
                    this.currentTurnProgress = progress;
                }, timeout);
            }
        },
        renderFrame() {
            this.renderer.render(this.scene, this.camera);
        },
        resize() {
            this.renderer.setSize(this.width, this.width);
        },
        trackParentDimensions() {
            const sync = () => this.width = this.$el.offsetWidth;

            sync();

            window.addEventListener('resize', sync);

            this.$on('hook:destroyed', () => {
                window.removeEventListener('resize', sync);
            });
        },
        turn(turn) {
            this.queue.push(turn);

            this.animateNextTurn();
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
        speed: {
            default: 3000,
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
    },
    watch: {
        width: 'resize',
    },
};
</script>
