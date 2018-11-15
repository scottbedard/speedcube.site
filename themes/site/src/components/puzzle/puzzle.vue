

<template>
    <div class="v-puzzle border border-red max-w-sm mx-auto">
        <pre>width: {{ width }}</pre> 
    </div>
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
            var obj = new THREE.Object3D;
            var plane = new THREE.Mesh(geometry, material);

            this.scene.add(obj);
            obj.add(plane);

            plane.translateY(50);
            plane.rotation.x = degreesToRadians(90);

            this.$el.appendChild(this.renderer.domElement);

            const animate = () => {
                obj.rotation.x += 0.025;

                this.renderer.render(this.scene, this.camera);

                requestAnimationFrame(animate);
            }

            animate();
        },
        init() {
            // create a scene
            this.scene = new THREE.Scene();

            // create and position a camera
            this.camera = new THREE.PerspectiveCamera(20, 1, 1, 1000);
            this.camera.position.set(0, 10, 500);
            this.camera.lookAt(0, 0, 0);

            // create a renderer
            this.renderer = new THREE.WebGLRenderer({
                antialias: true,
            });

            this.resizeRenderer();

            // add an axis helper
            this.scene.add(new THREE.AxesHelper(200));
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
