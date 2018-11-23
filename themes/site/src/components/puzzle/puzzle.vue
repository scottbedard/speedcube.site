<template>
    <div
        class="v-puzzle mx-auto"
        :style="{
            maxWidth: `${maxWidth}px`,
        }">
        <canvas
            class="border border-red"
            ref="canvas"
            :height="`${width}px`"
            :width="`${width}px`"
        />
    </div>
</template>

<script>
/* eslint-disable no-param-reassign */
import Cube from 'bedard-cube';
import * as THREE from 'three';

import {
    attachStickers,
    initCanvas,
    positionStickers,
    resizeRenderer,
} from './canvas';

// instantiate a cube, but don't track it with vue's
// reactivity system. we'll manage this ourselves.
function instantiateCube(vm) {
    vm.cube = new Cube(vm.size, { useObjects: true });
}

// // render a frame
// function render(vm) {
//     // @todo: move this to a resize listener
//     vm.renderer.setSize(vm.width, vm.width);

//     vm.renderer.render(vm.scene, vm.camera);
// }

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

// temp
function temp(vm) {


    // material
    const material = new THREE.MeshLambertMaterial({
        color: 0xff00f4,
    });

    // geometry
    const geometry = new THREE.BoxGeometry(100, 100, 100);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -1000;
    mesh.position.x = -100;
    vm.scene.add(mesh);

    // // shape
    // const shape = new THREE.Shape();
    // const offset = -(vm.stickerSize / 2);
    // const offsetSize = offset + vm.stickerSize;
    // const radius = vm.stickerSize * vm.stickerRadius;

    // shape.moveTo(offset, offset + radius);
    // shape.lineTo(offset, offsetSize - radius);
    // shape.quadraticCurveTo(offset, offsetSize, offset + radius, offsetSize);
    // shape.lineTo(offsetSize - radius, offsetSize);
    // shape.quadraticCurveTo(offsetSize, offsetSize, offsetSize, offsetSize - radius);
    // shape.lineTo(offsetSize, offset + radius);
    // shape.quadraticCurveTo(offsetSize, offset, offsetSize - radius, offset);
    // shape.lineTo(offset + radius, offset);
    // shape.quadraticCurveTo(offset, offset, offset, offset + radius);

    // // create a geometry for our rounded rectangle stickers
    // const geo2 = new THREE.ShapeBufferGeometry(shape);

    // const mesh2 = new THREE.Mesh(geo2, material);

    // mesh2.position.z = -5000;
    // mesh2.position.x = 200;
    // scene.add(mesh2);

    function animate() {
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.005;
        
        vm.renderer.render(vm.scene, vm.camera)

        requestAnimationFrame(animate);
    }

    animate();
}

//
// cube
//
export default {
    created() {
        // instantiate our cube state
        instantiateCube(this);
    },
    data() {
        return {
            width: 0,
        };
    },
    mounted() {
        // resize when our container's dimensions change
        trackDimensions(this);

        // initialize our canvas essentials so we can start rendering
        initCanvas(this);

        temp(this);

        // // attach 3d objects for each of our stickers
        // attachStickers(this);

        // // position the stickers
        // positionStickers(this);

        // render(this);
    },
    computed: {
        cubeSize() {
            // return the pixel size of our cube
            return this.stickerSize * this.size;
        },
        maxWidth() {
            // return a max width for the cube based on it's size
            return Math.min(768, Math.max(380, this.size * 100));
        },
        stickerSize() {
            // return the pixel size of a sticker
            return this.width / this.size;
        },
    },
    methods: {
        scramble() {
            this.cube.scramble();
        },
    },
    props: {
        size: {
            required: true,
            type: Number,
        },
        stickerRadius: {
            default: 0.1,
            type: Number,
        },
    },
    watch: {
        width() {
            // resize the renderer when our dimensions change
            if (this.renderer) {
                resizeRenderer(this);
            }
        },
    },
};
</script>
