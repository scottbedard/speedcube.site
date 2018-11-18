

<template>
    <div
        class="v-puzzle mx-auto"
        :style="{
            maxWidth: `${maxWidth}px`,
        }">
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
        colMap() {
            return new Array(this.size ** 2).fill(undefined).map((val, i) => {
                return getCol(this.size, i);
            });
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
            return new Array(this.size ** 2).fill(undefined).map((val, i) => {
                return getRow(this.size, i);
            });
        },
        stickerSize() {
            return this.width / this.size;
        },
    },
    methods: {
        createCanvas() {
            // create a scene
            this.scene = new THREE.Scene();

            // create and position a camera
            this.camera = new THREE.PerspectiveCamera(60, 1, 1, 10000);
            this.camera.position.set(0, 400, this.stickerSize * this.size * 2);
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
            const shape = new THREE.Shape();
            const offset = -(this.stickerSize / 2);
            const offsetSize = offset + this.stickerSize;
            const radius = this.stickerSize * this.stickerRadius;

            shape.moveTo(offset, offset + radius);
            shape.lineTo(offset, offsetSize - radius);
            shape.quadraticCurveTo(offset, offsetSize, offset + radius, offsetSize);
            shape.lineTo(offsetSize - radius, offsetSize);
            shape.quadraticCurveTo(offsetSize, offsetSize, offsetSize, offsetSize - radius);
            shape.lineTo(offsetSize, offset + radius );
            shape.quadraticCurveTo(offsetSize, offset, offsetSize - radius, offset);
            shape.lineTo(offset + radius, offset);
            shape.quadraticCurveTo(offset, offset, offset, offset + radius);

            this.cube.stickers(sticker => {
                sticker.mesh = new THREE.Mesh(
                    new THREE.ShapeBufferGeometry(shape), 
                    new THREE.MeshBasicMaterial({ color: this.colors[sticker.value], side: THREE.DoubleSide }),
                );

                sticker.mesh.scale.set(this.stickerScale, this.stickerScale, 1);
            });
        },
        draw() {
            // position the stickers
            this.positionStickers();

            // create a 3d object and attach it to our scene
            // this will be what we rotate to display the current turn
            const obj = new THREE.Object3D();
            this.scene.add(obj);

            // attach any stickers that are part of the current turn to our 3d obj
            // in this example, we'll make a R turn
            this.cube.state.r
                .forEach(sticker => obj.add(sticker.mesh));

            this.cube.state.u
                .filter((sticker, i) => getCol(this.size, i) === this.size - 1)
                .forEach(sticker => obj.add(sticker.mesh));

            this.cube.state.b
                .filter((sticker, i) => getCol(this.size, i) === 0)
                .forEach(sticker => obj.add(sticker.mesh));

            this.cube.state.d
                .filter((sticker, i) => getCol(this.size, i) === this.size - 1)
                .forEach(sticker => obj.add(sticker.mesh));

            this.cube.state.f
                .filter((sticker, i) => getCol(this.size, i) === this.size - 1)
                .forEach(sticker => obj.add(sticker.mesh));

            // start animating
            const animate = () => {
                const speed = -0.0125;

                // this.scene.rotation.x += speed;
                // this.scene.rotation.y += speed;
                // this.scene.rotation.z += speed;

                obj.rotation.x += speed;

                this.renderFrame();

                requestAnimationFrame(animate);
            };

            animate();
        },
        positionStickers() {
            // attach all stickers to the scene
            this.cube.stickers(sticker => this.scene.add(sticker.mesh));

            const translateSticker = (sticker, i) => {
                const x = -(this.halfCubeSize - this.halfStickerSize) + (this.colMap[i] * this.stickerSize);
                const y = -(this.halfCubeSize - this.halfStickerSize) + (this.rowMap[i] * this.stickerSize);

                if (x) {
                    sticker.mesh.translateX(x);
                }
                
                if (y) {
                    sticker.mesh.translateY(y);
                }
            }

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
            default: 0,
            type: Number,
        },
        stickerScale: {
            default: 0.85,
            type: Number,
        },
    },
    watch: {
        height: 'resizeRenderer',
        width: 'resizeRenderer',
    },
};
</script>
