

<template>
    <div class="v-puzzle max-w-sm mx-auto"></div>
</template>

<script>
import Cube from 'bedard-cube';

// @todo: optimize this import statement to only pull in
//        the pieces of three.js that we're actually using
import * as THREE from 'three';

// helper functionas to convert between radians and degrees
function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function radiansToDegrees(radians) {
  return radians * (180 / Math.PI);
}

export default {
    data() {
        return {
            cube: new Cube(this.size),
            height: 0,
            width: 0,
        };
    },
    mounted() {
        this.trackParentDimensions();
        this.init();
        this.draw();
    },
    computed: {
        // ...
    },
    methods: {
        draw() {
            var geometry = new THREE.PlaneGeometry(25, 25);
            var material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });

            // create a 3d object and attach it to our scene
            // this will be what we rotate to display the current turn
            var obj = new THREE.Object3D;
            this.scene.add(obj);

            // create a plane for each sticker on the cube
            var p1 = new THREE.Mesh(geometry, material);
            var p2 = new THREE.Mesh(geometry, material);
            var p3 = new THREE.Mesh(geometry, material);

            // translate the stickers to their normal position
            // orient all stickers according to their current face
            p1.translateZ(50);
            p1.translateX(-30);

            p2.translateZ(50);

            p3.translateZ(50);
            p3.translateX(30);

            // attach any stickers that are part of the current turn to our 3d obj
            obj.add(p2);
            obj.add(p3);

            // attach any uneffected stickers to our scene
            this.scene.add(p1);

            // start animating
            const animate = () => {
                obj.rotation.x += 0.0125;
                
                this.renderFrame();

                requestAnimationFrame(animate);
            }

            animate();
        },
        init() {
            // create a scene
            this.scene = new THREE.Scene();

            // create and position a camera
            this.camera = new THREE.PerspectiveCamera(20, 1, 1, 1000);
            this.camera.position.set(0, 20, 500);
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
            }

            sync();

            window.addEventListener('resize', sync);

            this.$on('hook:destroyed', () => {
                window.removeEventListener('resize', sync);
            });
        },
        turn(turn) {
            console.log ('ok', turn);
        },
    },
    props: {
        colors: {
            type: Array,
        },
        size: {
            required: true,
            type: Number,
        },
    },
    watch: {
        height: 'resizeRenderer',
        width: 'resizeRenderer',
    },
};
</script>
