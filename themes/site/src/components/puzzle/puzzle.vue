<template>
    <div
        class="v-puzzle mx-auto"
        :style="{ maxWidth: `${maxWidth}px` }">
        <canvas
            ref="canvas"
            :height="`${width}px`"
            :width="`${width}px`"
        />
    </div>
</template>

<script>
// @todo: optimize this import statement to only pull in
//        the pieces of three.js that we're actually using
import * as THREE from 'three';
import Color from 'color';
import Cube from 'bedard-cube';

import {
    degToRad,
    getCol,
    getEffectedStickers,
    getRow,
    getTurnAxisAndDegrees,
} from './helpers';

// cache some degree calculations
const degNeg90 = degToRad(-90);
const deg90 = degToRad(90);
const deg180 = degToRad(180);

export default {
    beforeDestroy() {
        this.isDestroying = true;
    },
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

            // this flag is used before destruction to prevent memory leaks
            isDestroying: false,

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
            return new Array(this.size ** 2).fill().map((val, i) => getCol(this.size, i));
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
            return Math.min(768, Math.max(380, this.size * 100));
        },
        rowMap() {
            return new Array(this.size ** 2).fill().map((val, i) => getRow(this.size, i));
        },
        stickerSize() {
            return this.width / this.size;
        },
    },
    methods: {
        animateNextTurn() {
            // do nothing if the cube is already being turned, or is being destroyed
            if (this.isDestroying || this.isTurning || this.queue.length === 0) {
                return;
            }

            // otherwise create a new turn and start animating it
            this.isTurning = true;

            const turnObj = new THREE.Object3D();
            const currentTurn = this.cube.parseTurn(this.queue.shift());

            // determine what axis we're turning and how much
            const { axis, degrees } = getTurnAxisAndDegrees(currentTurn);

            // attach effected stickers to the turn object,
            // then attach that turn object to our scene
            const stickers = getEffectedStickers(this.cube, currentTurn, this.rowMap, this.colMap)

            stickers.forEach(sticker => turnObj.add(sticker.mesh));

            this.scene.add(turnObj);

            // update our turn progress according to our turn speed
            this.processTurn();

            // create a requestAnimationFrame loop to update our canvas
            const animate = () => {
                turnObj.rotation[axis] = degToRad(this.currentTurnProgress * degrees);

                this.renderFrame();

                // render the next frame, or get ready for the next turn
                if (this.currentTurnProgress === 1) {
                    this.cube.turn([currentTurn]);
                    this.positionStickers();
                    this.currentTurnProgress = 0;
                    this.isTurning = false;
                    this.animateNextTurn();
                } else {
                    requestAnimationFrame(animate);
                }
            }

            animate();
        },
        createCanvas() {
            // create a scene
            this.scene = new THREE.Scene();

            // create and position a camera
            this.camera = new THREE.PerspectiveCamera(60, 1, 1, 2000);
            this.camera.position.set(0, this.cubeSize * .9, this.cubeSize * 1.5);
            this.camera.lookAt(0, 0, 0);

            // create a renderer
            this.renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true,
                canvas: this.$refs.canvas,
            });

            this.renderer.setClearColor(0x000000, 0);

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

            const points = shape.getPoints();
            const geometryPoints = new THREE.BufferGeometry().setFromPoints(points);

            this.cube.stickers((sticker) => {
                const color = Color(this.colors[sticker.value]);

                const geometry = new THREE.ShapeBufferGeometry(shape);

                const material = new THREE.MeshBasicMaterial({
                    color: color.hex(),
                    side: THREE.DoubleSide,
                });

                const mesh = new THREE.Mesh(geometry, material);

                mesh.scale.set(this.stickerScale, this.stickerScale, 1);

                // attach an outline to our mesh
                const outline = new THREE.Line(geometryPoints, new THREE.LineBasicMaterial({ 
                    color: color.darken(0.1).hex(),
                    linewidth: 1,
                }));

                mesh.add(outline);

                /* eslint-disable-next-line no-param-reassign */
                sticker.mesh = mesh;
            });
        },
        positionStickers() {
            this.refreshScene();

            const offset = -(this.halfCubeSize - this.halfStickerSize);

            const position = (sticker, x, y, z) => {
                sticker.mesh.position.x = x;
                sticker.mesh.position.y = y;
                sticker.mesh.position.z = z;
            }

            const rotate = (sticker, x, y, z) => {
                sticker.mesh.rotation.x = degToRad(x);
                sticker.mesh.rotation.y = degToRad(y);
                sticker.mesh.rotation.z = degToRad(z);
            }

            const translate = (sticker, i) => {
                const x = offset + (this.colMap[i] * this.stickerSize);
                const y = offset + (this.rowMap[i] * this.stickerSize);

                if (x) sticker.mesh.translateX(x);
                if (y) sticker.mesh.translateY(y);
            };

            // up
            this.cube.state.u.forEach((sticker, index) => {
                rotate(sticker, 90, 0, 0);
                position(sticker, 0, this.halfCubeSize, 0);
                translate(sticker, index);
            });

            // left
            this.cube.state.l.forEach((sticker, index) => {
                rotate(sticker, 180, 90, 0);
                position(sticker, -this.halfCubeSize, 0, 0);
                translate(sticker, index);
            });

            // front
            this.cube.state.f.forEach((sticker, index) => {
                rotate(sticker, 180, 0, 0);
                position(sticker, 0, 0, this.halfCubeSize);
                translate(sticker, index);
            });

            // right
            this.cube.state.r.forEach((sticker, index) => {
                rotate(sticker, 180, -90, 0);
                position(sticker, this.halfCubeSize, 0, 0);
                translate(sticker, index);
            });

            // back
            this.cube.state.b.forEach((sticker, index) => {
                rotate(sticker, 0, 0, 180);
                position(sticker, 0, 0, -this.halfCubeSize);
                translate(sticker, index);
            });

            // // down
            this.cube.state.d.forEach((sticker, index) => {
                rotate(sticker, -90, 0, 0);
                position(sticker, 0, -this.halfCubeSize, 0);
                translate(sticker, index);
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
        refreshScene() {
            // remove everything from the scene
            while(this.scene.children.length > 0){ 
                this.scene.remove(this.scene.children[0]); 
            }

            // add all stickers to the scene
            this.cube.stickers(sticker => this.scene.add(sticker.mesh));
        },
        resize() {
            this.renderer.setSize(this.width, this.width);
        },
        scramble() {
            this.turn(this.cube.generateScrambleString());
        },
        trackParentDimensions() {
            const sync = () => this.width = this.$el.offsetWidth;

            sync();

            window.addEventListener('resize', sync);

            this.$on('hook:destroyed', () => {
                window.removeEventListener('resize', sync);
            });
        },
        turn(turns) {
            this.queue.push(...turns.split(' ').map(turn => turn.trim()));

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
            default: 100,
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
